import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { listCopied, selectListById } from "../listsSlice";

import { TextField } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import { nanoid } from "@reduxjs/toolkit";
import { ContextModalList } from "../ListItem";
import ButtonMain from "../../../components/ButtonMain";
import Label from "../../../components/Label";

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
      <Label text="Название" sx={{ mt: 2 }} />
      <TextField
        size="small"
        fullWidth
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ButtonMain
        text="Создать список"
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(listCopied({ currentListId: listId, newListId, title }));
          handleCloseModal();
        }}
      />
    </>
  );
}
