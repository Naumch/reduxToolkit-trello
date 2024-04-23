import { useState, Dispatch, SetStateAction } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { listUpdated, selectListsdByBoardId } from "../listsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

import { cardsMovedAnotherList } from "../../cards/cardsSlice";
import { useParams } from "react-router-dom";
import CopyList from "./CopyList";
import MoveCards from "./MoveCards";
import MoveList from "./MoveList";
import SortList from "./SortList";
import MoveCardsToArchive from "./MoveCardsToArchive";

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
  const { boardId } = useParams();

  const [isCopyingList, setIsCopyingList] = useState(false);
  const [isMovingList, setIsMovingList] = useState(false);
  const [isSortingList, setIsSortingList] = useState(false);
  const [isMovingCards, setIsMovingCards] = useState(false);
  const [isMovingCardsToArchive, setIsMovingCardsToArchive] = useState(false);

  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectListsdByBoardId(boardId!));

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
      func: () => setIsCopyingList(true),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Перемещение списка",
      func: () => setIsMovingList(true),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Сортировать по...",
      func: () => setIsSortingList(true),
      divider: true,
    },
    {
      id: nanoid(),
      text: "Переместить все карточки в этом списке",
      func: () => setIsMovingCards(true),
      divider: false,
    },
    {
      id: nanoid(),
      text: "Архивировать все карточки в этом списке",
      func: () => setIsMovingCardsToArchive(true),
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

  if (isCopyingList) {
    return <CopyList handleClickPrev={() => setIsCopyingList(false)} />;
  }

  if (isMovingList) {
    return <MoveList handleClickPrev={() => setIsMovingList(false)} />;
  }

  if (isSortingList) {
    return <SortList handleClickPrev={() => setIsSortingList(false)} />;
  }

  if (isMovingCards) {
    return (
      <>
        <MoveCards handleClickPrev={() => setIsMovingCards(false)} />
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
                  handleCloseModal();
                }}
                key={list.id}
                sx={{ pl: 4 }}
              >
                <ListItemText>{list.title}</ListItemText>
              </ListItemButton>
            )
          )}
        </List>
      </>
    );
  }

  if (isMovingCardsToArchive) {
    return (
      <MoveCardsToArchive
        handleClickPrev={() => setIsMovingCardsToArchive(false)}
      />
    );
  }

  const renderedListActions = actions.map((action) => (
    <div id={action.id}>
      <ListItemButton onClick={action.func}>
        <ListItemText>{action.text}</ListItemText>
      </ListItemButton>
      {action.divider && <Divider />}
    </div>
  ));

  return (
    <>
      <Typography align="center" fontWeight={500}>
        Действия со списком
      </Typography>
      <List>{renderedListActions}</List>
    </>
  );
}
