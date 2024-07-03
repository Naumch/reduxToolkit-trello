import { Dispatch, SetStateAction, createContext, useState } from "react";
import {
  pressedEnter,
  useAppDispatch,
  useAppSelector,
} from "../../common/hooks";
import { listUpdated } from "./listsSlice";
import { selectCardsdByListId } from "../cards/cardsSlice";

import { Box, Typography, TextField, Stack, IconButton } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import ModalContent from "./Modal/ModalContent";
import CardItem from "../cards/CardItem";
import FormAddNewCard from "../cards/FormAddNewCard";
import ModalWrapper from "../../components/ModalWrapper";
import ButtonSecondary from "../../components/ButtonSecondary";

const sort = (array: Card[], sorting: Sorting) => {
  if (sorting === "new") {
    return array.sort((a, b) => b.time.localeCompare(a.time));
  } else if (sorting === "old") {
    return array.sort((a, b) => a.time.localeCompare(b.time));
  } else {
    return array.sort((a, b) => a.title.localeCompare(b.title));
  }
};

interface IContextModalList {
  listId: string;
  handleCloseModal: FunctionVoid;
  handleClickPrev: FunctionVoid;
  listAction: ListAction;
  setIsAddingCard?: Dispatch<SetStateAction<boolean>>;
}

export const ContextModalList = createContext<IContextModalList>({
  listId: "",
  handleCloseModal: () => {},
  handleClickPrev: () => {},
  listAction: "default",
});

type Props = {
  list: List;
};

export default function ListItem({ list }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [listAction, setListAction] = useState<ListAction>("default");
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();

  const updateTitle = () => {
    if (title.trim()) {
      dispatch(listUpdated({ id: list.id, changes: { title } }));
    } else {
      setTitle(list.title);
    }
    setIsEditingTitle(false);
  };

  const handleCloseModal = () => {
    setListAction("default");
    setOpenModal(false);
  };
  const handleClickPrev = () => setListAction("default");

  const valueContext: IContextModalList = {
    listId: list.id,
    handleCloseModal,
    handleClickPrev,
    listAction,
    setIsAddingCard,
  };

  const cards = useAppSelector(selectCardsdByListId(list.id));
  const sortedCards = sort(cards, list.sort);
  const renderedCards = sortedCards.map((card) => <CardItem card={card} />);

  const textButton = (
    <>
      <AddIcon fontSize="small" sx={{ mr: 1, mb: "-5px" }} />
      Добавить карточку
    </>
  );

  return (
    <Box
      sx={{
        minWidth: 272,
        maxWidth: 272,
        p: 1,
        borderRadius: 2,
        backgroundColor: "#F1F2F4",
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {isEditingTitle ? (
          <ClickAwayListener onClickAway={updateTitle}>
            <TextField
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              size="small"
              sx={{ backgroundColor: "white" }}
              onKeyDown={(event) => pressedEnter(event, updateTitle)}
            />
          </ClickAwayListener>
        ) : (
          <Typography
            sx={{ cursor: "pointer", pl: 1.7 }}
            onClick={() => {
              setTitle(list.title);
              setIsEditingTitle(true);
            }}
          >
            {list.title}
          </Typography>
        )}
        <IconButton onClick={() => setOpenModal(true)}>
          <MoreHorizIcon />
        </IconButton>
      </Box>
      <ContextModalList.Provider value={valueContext}>
        <ModalWrapper open={openModal} onClose={handleCloseModal}>
          <ModalContent setListAction={setListAction} />
        </ModalWrapper>
        <Stack>{renderedCards}</Stack>
        {isAddingCard ? (
          <FormAddNewCard />
        ) : (
          <ButtonSecondary
            onClick={() => setIsAddingCard(true)}
            text={textButton}
            fullWidth
            sx={{ mt: 2 }}
          />
        )}
      </ContextModalList.Provider>
    </Box>
  );
}
