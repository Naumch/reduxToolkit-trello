import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAllBoards } from "../../boards/boardsSlice";
import { listUpdated } from "../listsSlice";

import { Select, MenuItem, Typography, Box, Button } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";

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

  const [newBoardId, setNewBoardId] = useState(currentBoard!.id);

  const dispatch = useAppDispatch();

  const renderedMenuItem = boards.map((board) => (
    <MenuItem key={board.id} value={board.id}>
      {board.title}
    </MenuItem>
  ));

  const handleClick = () => {
    dispatch(listUpdated({ id: listId, changes: { board: newBoardId } }));
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
          {renderedMenuItem}
        </Select>
      </Box>
      <Button variant="contained" size="small" onClick={handleClick}>
        Переместить
      </Button>
    </>
  );
}
