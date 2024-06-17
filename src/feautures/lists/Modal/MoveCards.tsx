import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { selectListsdByBoardId } from "../listsSlice";
import { cardsMovedToAnotherList } from "../../cards/cardsSlice";

import ModalHeader from "../../../components/ModalHeader";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useContext } from "react";
import { ContextModalList } from "../ListItem";

export default function MoveCards() {
  const { listId, handleClickPrev, handleCloseModal } =
    useContext(ContextModalList);

  const { boardId } = useParams();
  const lists = useAppSelector(selectListsdByBoardId(boardId!));
  const dispatch = useAppDispatch();

  const handleClick = (newListId: string) => {
    dispatch(cardsMovedToAnotherList({ currentListId: listId, newListId }));
    handleCloseModal();
  };

  const renderedListItems = lists.map((list) =>
    list.id === listId ? (
      <ListItemButton disabled key={list.id} sx={{ pl: 4 }}>
        <ListItemText>{list.title} (текущий)</ListItemText>
      </ListItemButton>
    ) : (
      <ListItemButton
        onClick={() => handleClick(list.id)}
        key={list.id}
        sx={{ pl: 4 }}
      >
        <ListItemText>{list.title}</ListItemText>
      </ListItemButton>
    )
  );

  return (
    <>
      <ModalHeader
        title="Переместить все карточки в список"
        handleClickPrev={handleClickPrev}
      />
      <List>{renderedListItems}</List>
    </>
  );
}
