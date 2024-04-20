import { useState } from "react";

import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ModalActionsWithList from "./ModalActionsWithList";
import { pressedEnter, useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCardsdByListId } from "../cards/cardsSlice";
import { listUpdated } from "./listsSlice";
import CardItem from "../cards/CardItem";
import FormAddNewCard from "../cards/FormAddNewCard";

type Props = {
  list: List;
};

export default function ListItem({ list }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const updateTitle = () => {
    if (title) {
      dispatch(listUpdated({ id: list.id, changes: { title } }));
    } else {
      setTitle(list.title);
    }
    setIsEditing(false);
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
        {isEditing ? (
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
              setIsEditing(true);
            }}
          >
            {list.title}
          </Typography>
        )}
        <ModalActionsWithList
          listId={list.id}
          setIsAddingCard={setIsAddingCard}
        />
      </Box>
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
