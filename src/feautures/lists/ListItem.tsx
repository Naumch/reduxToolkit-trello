import { useState } from "react";
import { pressedEnter, useAppDispatch, useAppSelector } from "../../app/hooks";
import { listUpdated } from "./listsSlice";
import { selectCardsdByListId } from "../cards/cardsSlice";

import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModalContent from "./Modal/ModalContent";
import CardItem from "../cards/CardItem";
import FormAddNewCard from "../cards/FormAddNewCard";
import ModalWrapper from "../../components/ModalWrapper";

const sort = (array: Card[], sorting: Sorting) => {
  if (sorting === "new") {
    return array.sort((a, b) => b.time.localeCompare(a.time));
  } else if (sorting === "old") {
    return array.sort((a, b) => a.time.localeCompare(b.time));
  } else {
    return array.sort((a, b) => a.title.localeCompare(b.title));
  }
};

type Props = {
  list: List;
};

export default function ListItem({ list }: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();

  const updateTitle = () => {
    if (title) {
      dispatch(listUpdated({ id: list.id, changes: { title } }));
    } else {
      setTitle(list.title);
    }
    setIsEditingTitle(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const cards = useAppSelector(selectCardsdByListId(list.id));
  const sorttedCards = sort(cards, list.sort);
  const renderedCards = sorttedCards.map((card) => <CardItem card={card} />);

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
      <ModalWrapper open={openModal} onClose={handleCloseModal}>
        <ModalContent
          listId={list.id}
          setIsAddingCard={setIsAddingCard}
          handleCloseModal={handleCloseModal}
        />
      </ModalWrapper>
      <Stack>{renderedCards}</Stack>
      {isAddingCard ? (
        <FormAddNewCard listId={list.id} setIsAddingCard={setIsAddingCard} />
      ) : (
        <Button
          onClick={() => setIsAddingCard(true)}
          sx={{ mt: 2 }}
          size="small"
          variant="contained"
          fullWidth
        >
          Добавить карточку
        </Button>
      )}
    </Box>
  );
}
