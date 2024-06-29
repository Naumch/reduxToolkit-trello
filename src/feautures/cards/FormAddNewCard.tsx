import { useState, useContext } from "react";
import { useAppDispatch, pressedEnter } from "../../common/hooks";
import { cardAdded } from "./cardsSlice";
import { useParams } from "react-router-dom";

import { IconButton, TextField, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { ContextModalList } from "../lists/ListItem";
import ButtonMain from "../../components/ButtonMain";

export default function FormAddNewCard() {
  const { listId, setIsAddingCard } = useContext(ContextModalList);
  const { boardId } = useParams();
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const saveNewCard = () => {
    if (title) {
      dispatch(cardAdded({ title, listId, boardId }));
      setTitle("");
    } else {
      setIsAddingCard!(false);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        saveNewCard();
        setIsAddingCard!(false);
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
        <ButtonMain
          onClick={saveNewCard}
          text="Добавить карточку"
          sx={{ mr: 1 }}
        />
        <IconButton onClick={() => setIsAddingCard!(false)}>
          <CloseIcon fontSize="small" htmlColor="black" />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}
