import { useState, Dispatch, SetStateAction } from "react";
import { useAppDispatch, pressedEnter } from "../../app/hooks";
import { listAdded } from "./listsSlice";
import { Box, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useClickAway } from "@uidotdev/usehooks";

type Props = {
  boardId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function FormAddNewList({ boardId, setIsEditing }: Props) {
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const saveNewList = () => {
    dispatch(listAdded({ title, boardId }));
    setTitle("");
    setIsEditing(false);
  };

  const ref = useClickAway(() => {
    setIsEditing(false);
  });

  return (
    <Box
      sx={{
        backgroundColor: "#F1F2F4",
        boxShadow: 1,
        width: 272,
        padding: 1,
        borderRadius: 2,
      }}
      ref={ref}
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
      <Button
        sx={{ mr: 1 }}
        onClick={saveNewList}
        size="small"
        variant="contained"
      >
        Добавить список
      </Button>
      <IconButton onClick={() => setIsEditing(false)}>
        <CloseIcon fontSize="small" htmlColor="black" />
      </IconButton>
    </Box>
  );
}
