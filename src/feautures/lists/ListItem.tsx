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
  Modal,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";

import ModalContent from "./Modal/ModalContent";
import CardItem from "../cards/CardItem";
import FormAddNewCard from "../cards/FormAddNewCard";

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

  const renderedCards = cards.map((card) => <CardItem card={card} />);

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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -25%)",
            width: 344,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <ModalContent
              listId={list.id}
              setIsAddingCard={setIsAddingCard}
              handleCloseModal={handleCloseModal}
            />
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{ position: "absolute", top: -5, right: -6 }}
            >
              <CloseIcon fontSize="small" htmlColor="black" />
            </IconButton>
          </Box>
        </Box>
      </Modal>
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
