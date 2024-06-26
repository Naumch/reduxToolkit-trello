import { Dispatch, SetStateAction, useContext } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { listUpdated } from "../listsSlice";
import { useAppDispatch } from "../../../common/hooks";

import { List, ListItemButton, ListItemText, Divider } from "@mui/material";
import CopyList from "./CopyList";
import MoveCards from "./MoveCards";
import MoveList from "./MoveList";
import SortList from "./SortList";
import MoveCardsToArchive from "./MoveCardsToArchive";
import ModalHeader from "../../../components/ModalHeader";
import { ContextModalList } from "../ListItem";

type Props = {
  setListAction: Dispatch<SetStateAction<ListAction>>;
};

type Action = {
  id: string;
  text: string;
  func: FunctionVoid;
  divider: boolean;
};

export default function ModalContent({ setListAction }: Props) {
  const { listId, handleCloseModal, listAction, setIsAddingCard } =
    useContext(ContextModalList);

  const dispatch = useAppDispatch();

  const actions: Action[] = [
    {
      id: nanoid(),
      text: "Добавить карточку",
      func: () => {
        setIsAddingCard!(true);
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
      divider: false,
    },
    {
      id: nanoid(),
      text: "Переместить все карточки в этом списке",
      func: () => setListAction("moveCards"),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Сортировать по...",
      func: () => setListAction("sortList"),
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
    {
      id: nanoid(),
      text: "Архивировать все карточки в этом списке",
      func: () => setListAction("moveCardsToArchive"),
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
    return <CopyList />;
  } else if (listAction === "moveList") {
    return <MoveList />;
  } else if (listAction === "sortList") {
    return <SortList />;
  } else if (listAction === "moveCards") {
    return <MoveCards />;
  } else if (listAction === "moveCardsToArchive") {
    return <MoveCardsToArchive />;
  } else {
    return (
      <>
        <ModalHeader title="Действия со списком" />
        <List>{renderedListItems}</List>
      </>
    );
  }
}
