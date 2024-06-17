import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { listCopied, selectListById } from "../listsSlice";

import { Button, TextField, Typography } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import { nanoid } from "@reduxjs/toolkit";
import { ContextModalList } from "../ListItem";

export default function CopyList() {
  const { listId, handleClickPrev, handleCloseModal } =
    useContext(ContextModalList);

  const list = useAppSelector((state) => selectListById(state, listId));
  const [title, setTitle] = useState(list.title);

  const dispatch = useAppDispatch();
  const newListId = nanoid();

  return (
    <>
      <ModalHeader
        title="Копирование списка"
        handleClickPrev={handleClickPrev}
      />
      <Typography variant="body2" mt={2} mb={0.5}>
        Название
      </Typography>
      <TextField
        size="small"
        fullWidth
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        variant="contained"
        size="small"
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(listCopied({ currentListId: listId, newListId, title }));
          handleCloseModal();
        }}
      >
        Создать список
      </Button>
    </>
  );
}
