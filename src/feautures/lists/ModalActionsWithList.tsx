import { useState, ReactNode, Dispatch, SetStateAction } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { listToggleArchive } from "./listsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import ModalWrapper from "../../components/ModalWrapper";
import {
  cardsDeletedByListId,
  cardsMovedAnotherList,
} from "../cards/cardsSlice";

type Props = {
  listId: string;
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
};

type Action = {
  id: string;
  text: string;
  func: () => void;
  divider: boolean;
  collapse?: ReactNode;
};

export default function ModalActionsWithList({
  listId,
  setIsAddingCard,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenCollapse(false);
  };

  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.lists);

  const actions: Action[] = [
    {
      id: nanoid(),
      text: "Добавить карточку",
      func: () => {
        setIsAddingCard(true);
        handleClose();
      },
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
      divider: true,
    },
    {
      id: nanoid(),
      text: "Сортировать по...",
      func: () => console.log("test"),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Переместить все карточки в этом списке",
      func: () => setOpenCollapse(!openCollapse),
      divider: false,
      collapse: (
        <Collapse in={openCollapse} timeout="auto">
          <List>
            {lists.map((list) =>
              list.id === listId ? (
                <ListItemButton disabled key={list.id} sx={{ pl: 4 }}>
                  <ListItemText>{list.title} (текущая)</ListItemText>
                </ListItemButton>
              ) : (
                <ListItemButton
                  onClick={() => {
                    dispatch(
                      cardsMovedAnotherList({
                        currentListId: listId,
                        newListId: list.id,
                      })
                    );
                    handleClose();
                  }}
                  key={list.id}
                  sx={{ pl: 4 }}
                >
                  <ListItemText>{list.title}</ListItemText>
                </ListItemButton>
              )
            )}
          </List>
        </Collapse>
      ),
    },
    {
      id: nanoid(),
      text: "Архивировать все карточки в этом списке",
      func: () => {
        dispatch(cardsDeletedByListId({ listId }));
        handleClose();
      },
      divider: true,
    },
    {
      id: nanoid(),
      text: "Архивировать список",
      func: () => {
        dispatch(listToggleArchive({ listId }));
        handleClose();
      },
      divider: false,
    },
  ];

  const renderedListActions = actions.map((action) => (
    <div id={action.id}>
      <ListItemButton onClick={action.func}>
        <ListItemText>{action.text}</ListItemText>
      </ListItemButton>
      {action.collapse}
      {action.divider && <Divider />}
    </div>
  ));

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreHorizIcon />
      </IconButton>
      <ModalWrapper
        title="Действия со списком"
        open={open}
        onClose={handleClose}
      >
        <List>{renderedListActions}</List>
      </ModalWrapper>
    </>
  );
}
