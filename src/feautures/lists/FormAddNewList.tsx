import { useState, Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../app/hooks";
import { listAdded } from "./listsSlice";
import { Box, Button, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  boardId: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

export default function FormAddNewList({ boardId, setEdit }: Props) {
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const saveNewList = () => {
    dispatch(listAdded({ title: value, boardId }));
    setValue("");
    setEdit(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F1F2F4",
        boxShadow: 1,
        width: 272,
        padding: 1,
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        placeholder="Ввести заголовок списка"
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
      <IconButton onClick={() => setEdit(false)}>
        <CloseIcon fontSize="small" htmlColor="black" />
      </IconButton>
    </Box>
  );
}
