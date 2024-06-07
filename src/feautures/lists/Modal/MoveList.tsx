import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAllBoards } from "../../boards/boardsSlice";
import { listUpdated } from "../listsSlice";

import { List, ListItemButton, ListItemText } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import { useContext } from "react";
import { ContextModalList } from "../ListItem";

export default function MoveList() {
  const { listId, handleClickPrev, handleCloseModal } =
    useContext(ContextModalList);

  const { boardId } = useParams();
  const boards = useAppSelector(selectAllBoards);

  const dispatch = useAppDispatch();

  const handleClick = (boardId: string) => {
    dispatch(listUpdated({ id: listId, changes: { board: boardId } }));
    handleCloseModal();
  };

  const renderedListItems = boards.map((board) =>
    board.id === boardId ? (
      <ListItemButton disabled key={board.id} sx={{ pl: 4 }}>
        <ListItemText>{board.title} (текущая)</ListItemText>
      </ListItemButton>
    ) : (
      <ListItemButton
        onClick={() => handleClick(board.id)}
        key={board.id}
        sx={{ pl: 4 }}
      >
        <ListItemText>{board.title}</ListItemText>
      </ListItemButton>
    )
  );

  return (
    <>
      <ModalHeader
        title="Переместить список на доску"
        handleClickPrev={handleClickPrev}
      />
      <List>{renderedListItems}</List>
    </>
  );
}
