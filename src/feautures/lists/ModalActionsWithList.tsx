import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { listDeleted } from "./listsSlice";
import { useAppDispatch } from "../../app/hooks";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import ModalHeader from "../../components/ModalHeader";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModalWrapper from "../../components/ModalWrapper";

type Props = {
  id: string;
};

type Action = {
  id: string;
  text: string;
  func: () => void;
  divider: boolean;
};

export default function ModalActionsWithList({ id }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const actions: Action[] = [
    {
      id: nanoid(),
      text: "Добавить карточку",
      func: () => console.log("test"),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Копирование списка",
      func: () => console.log("test"),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Перемещение списка",
      func: () => console.log("test"),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Подписаться",
      func: () => console.log("test"),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Переместить все карточки в этом списке",
      func: () => console.log("test"),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Архивировать все карточки в этом списке",
      func: () => console.log("test"),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Архивировать список",
      func: () => {
        dispatch(listDeleted({ id }));
        handleClose();
      },
      divider: false,
    },
  ];

  const renderedListActions = actions.map((action) => (
    <div id={action.id}>
      <ListItem disablePadding>
        <ListItemButton onClick={action.func}>
          <ListItemText>{action.text}</ListItemText>
        </ListItemButton>
      </ListItem>
      {action.divider && <Divider />}
    </div>
  ));

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreHorizIcon />
      </IconButton>
      <ModalWrapper open={open} onClose={handleClose}>
        <ModalHeader title="Действия со списком" onClick={handleClose} />
        <List>{renderedListActions}</List>
      </ModalWrapper>
    </>
  );
}
