import { useState } from "react";

import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import ModalActionsWithList from "./ModalActionsWithList";
import { pressedEnter, useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCardsdByListId } from "../cards/cardsSlice";
import { listTitleUpdated } from "./listsSlice";
import CardItem from "../cards/CardItem";
import FormAddNewCard from "../cards/FormAddNewCard";
import { useClickAway } from "@uidotdev/usehooks";

type Props = {
  list: List;
};

export default function ListItem({ list }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [title, setTitle] = useState(list.title);

  const dispatch = useAppDispatch();

  const updateTitle = () => {
    dispatch(listTitleUpdated({ id: list.id, title }));
    setIsEditing(false);
  };

  const cards = useAppSelector((state) => selectCardsdByListId(state, list.id));
  const renderedCards = cards.map((card) => <CardItem card={card} />);

  const ref = useClickAway(() => {
    updateTitle();
  });

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
          <TextField
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            size="small"
            sx={{ backgroundColor: "white" }}
            onKeyDown={(event) => pressedEnter(event, updateTitle)}
            inputRef={ref}
          />
        ) : (
          <Typography
            sx={{ cursor: "pointer", pl: 1.7 }}
            onClick={() => setIsEditing(true)}
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
