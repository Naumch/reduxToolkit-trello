import { useState, Dispatch, SetStateAction } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { listUpdated } from "../listsSlice";
import { useAppDispatch } from "../../../app/hooks";

import { List, ListItemButton, ListItemText, Divider } from "@mui/material";
import CopyList from "./CopyList";
import MoveCards from "./MoveCards";
import MoveList from "./MoveList";
import SortList from "./SortList";
import MoveCardsToArchive from "./MoveCardsToArchive";
import ModalHeader from "../../../components/ModalHeader";

type Props = {
  listId: string;
  setIsAddingCard: Dispatch<SetStateAction<boolean>>;
  handleCloseModal: () => void;
};

type Action = {
  id: string;
  text: string;
  func: () => void;
  divider: boolean;
};

export default function ModalContent({
  listId,
  setIsAddingCard,
  handleCloseModal,
}: Props) {
  const [listAction, setListAction] = useState<ListAction>("default");

  const handleClickPrev = () => setListAction("default");
  const dispatch = useAppDispatch();

  const actions: Action[] = [
    {
      id: nanoid(),
      text: "Добавить карточку",
      func: () => {
        setIsAddingCard(true);
        handleCloseModal();
      },
      divider: false,
    },
    {
      id: nanoid(),
      text: "Копирование списка",
      func: () => setListAction("copyList"),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Перемещение списка",
      func: () => setListAction("moveList"),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Сортировать по...",
      func: () => setListAction("sortList"),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Переместить все карточки в этом списке",
      func: () => setListAction("moveCards"),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Архивировать все карточки в этом списке",
      func: () => setListAction("moveCardsToArchive"),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Архивировать список",
      func: () => {
        dispatch(listUpdated({ id: listId, changes: { archive: true } }));
        handleCloseModal();
      },
      divider: false,
    },
  ];

  const renderedListItems = actions.map((action) => (
    <div id={action.id}>
      <ListItemButton onClick={action.func}>
        <ListItemText>{action.text}</ListItemText>
      </ListItemButton>
      {action.divider && <Divider />}
    </div>
  ));

  if (listAction === "copyList") {
    return (
      <CopyList
        handleClickPrev={handleClickPrev}
        handleCloseModal={handleCloseModal}
        listId={listId}
      />
    );
  } else if (listAction === "moveList") {
    return (
      <MoveList
        listId={listId}
        handleClickPrev={handleClickPrev}
        handleCloseModal={handleCloseModal}
      />
    );
  } else if (listAction === "sortList") {
    return (
      <SortList
        listId={listId}
        handleClickPrev={handleClickPrev}
        handleCloseModal={handleCloseModal}
      />
    );
  } else if (listAction === "moveCards") {
    return (
      <MoveCards
        listId={listId}
        handleClickPrev={handleClickPrev}
        handleCloseModal={handleCloseModal}
      />
    );
  } else if (listAction === "moveCardsToArchive") {
    return (
      <MoveCardsToArchive
        handleClickPrev={handleClickPrev}
        handleCloseModal={handleCloseModal}
        listId={listId}
      />
    );
  } else {
    return (
      <>
        <ModalHeader title="Действия со списком" />
        <List>{renderedListItems}</List>
      </>
    );
  }
}
