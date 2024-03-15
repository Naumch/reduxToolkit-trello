import { useState, Dispatch, SetStateAction } from "react";
import { useAppDispatch, pressedEnter } from "../../app/hooks";
import { Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { cardAdded } from "./cardsSlice";

type Props = {
  listId: string;
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
};

export default function FormAddNewCard({ listId, setIsAddingCard }: Props) {
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const saveNewCard = () => {
    dispatch(cardAdded({ title, listId }));
    setTitle("");
  };

  return (
    <>
      <TextField
        fullWidth
        placeholder="Ввести заголовок для этой карточки"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => pressedEnter(e, saveNewCard)}
        sx={{ mb: 1, backgroundColor: "white", borderRadius: 1 }}
      />
      <Button
        onClick={saveNewCard}
        sx={{ mr: 1 }}
        size="small"
        variant="contained"
      >
        Добавить карточку
      </Button>
      <IconButton onClick={() => setIsAddingCard(false)}>
        <CloseIcon fontSize="small" htmlColor="black" />
      </IconButton>
    </>
  );
}
