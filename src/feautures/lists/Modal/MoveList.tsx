import { Select, MenuItem, Typography, Box, Button } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAllBoards } from "../../boards/boardsSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { listUpdated, selectListsdByBoardId } from "../listsSlice";

type Props = {
  listId: string;
  handleClickPrev: () => void;
  handleCloseModal: () => void;
};

export default function MoveList({
  listId,
  handleClickPrev,
  handleCloseModal,
}: Props) {
  const { boardId } = useParams();

  const boards = useAppSelector(selectAllBoards);
  const currentBoard = boards.find((board) => board.id === boardId);

  const lists = useAppSelector(selectListsdByBoardId(boardId!));
  const currentList = lists.find((list) => list.id === listId);

  const [newBoardId, setNewBoardId] = useState(currentBoard!.id);
  const [newPosition, setNewPosition] = useState(currentList!.board.position);

  const dispatch = useAppDispatch();

  const menuItemBoardRendered = boards.map((board) => (
    <MenuItem key={board.id} value={board.id}>
      {board.title}
    </MenuItem>
  ));

  const menuItemPositionRendered = lists.map((list) => (
    <MenuItem key={list.id} value={list.board.position}>
      {list.board.position}
    </MenuItem>
  ));

  const handleClick = () => {
    dispatch(
      listUpdated({
        id: listId,
        changes: { board: { id: newBoardId, position: newPosition } },
      })
    );
    handleCloseModal();
  };

  return (
    <>
      <ModalHeader
        title="Перемещение списка"
        handleClickPrev={handleClickPrev}
      />
      <Box my={2}>
        <Typography variant="body2" mb={0.5}>
          Доска
        </Typography>
        <Select
          value={newBoardId}
          size="small"
          onChange={(e) => setNewBoardId(e.target.value as string)}
          fullWidth
        >
          {menuItemBoardRendered}
        </Select>
        <Typography variant="body2" mb={0.5} mt={2}>
          Позиция
        </Typography>
        <Select
          value={newPosition}
          size="small"
          onChange={(e) => setNewPosition(+e.target.value)}
          fullWidth
        >
          {menuItemPositionRendered}
        </Select>
      </Box>
      <Button variant="contained" size="small" onClick={handleClick}>
        Переместить
      </Button>
    </>
  );
}
