import { useState, Dispatch, SetStateAction } from "react";
import { useAppDispatch, pressedEnter } from "../../app/hooks";
import { Button, IconButton, TextField, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { cardAdded } from "./cardsSlice";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useParams } from "react-router-dom";

type Props = {
  listId: string;
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
};

export default function FormAddNewCard({ listId, setIsAddingCard }: Props) {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const saveNewCard = () => {
    if (title) {
      dispatch(cardAdded({ title, listId, boardId }));
      setTitle("");
    } else {
      setIsAddingCard(false);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        saveNewCard();
        setIsAddingCard(false);
      }}
    >
      <Box mt={1}>
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
      </Box>
    </ClickAwayListener>
  );
}
