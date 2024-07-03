import { useState, Dispatch, SetStateAction } from "react";
import { useAppDispatch, pressedEnter } from "../../common/hooks";
import { listAdded } from "./listsSlice";

import { Box, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ButtonMain from "../../components/ButtonMain";

type Props = {
  boardId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function FormAddNewList({ boardId, setIsEditing }: Props) {
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const saveNewList = () => {
    if (title.trim()) {
      dispatch(listAdded({ title, boardId }));
      setTitle("");
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsEditing(false);
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F1F2F4",
          boxShadow: 1,
          minWidth: 272,
          padding: 1,
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Ввести заголовок списка"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(event) => pressedEnter(event, saveNewList)}
          sx={{ mb: 1, backgroundColor: "white", borderRadius: 1 }}
        />
        <ButtonMain
          sx={{ mr: 1 }}
          onClick={saveNewList}
          text="Добавить список"
        />
        <IconButton onClick={() => setIsEditing(false)}>
          <CloseIcon fontSize="small" htmlColor="black" />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}
