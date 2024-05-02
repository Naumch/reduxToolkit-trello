import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { listAdded, selectListById } from "../listsSlice";

import { Button, TextField, Typography } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";

type Props = {
  handleClickPrev: () => void;
  handleCloseModal: () => void;
  listId: string;
};

export default function CopyList({
  handleClickPrev,
  handleCloseModal,
  listId,
}: Props) {
  const list = useAppSelector((state) => selectListById(state, listId));
  const { boardId } = useParams();
  const [title, setTitle] = useState(list.title);

  const dispatch = useAppDispatch();

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        variant="contained"
        size="small"
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(listAdded({ boardId, title }));
          handleCloseModal();
        }}
      >
        Создать список
      </Button>
    </>
  );
}
