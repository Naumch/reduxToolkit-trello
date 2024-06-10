import {
  Typography,
  Select,
  MenuItem,
  Box,
  Button,
  FormHelperText,
} from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAllBoards } from "../../boards/boardsSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectListById, selectListsdByBoardId } from "../../lists/listsSlice";
import { cardUpdated } from "../cardsSlice";

type Props = {
  card: Card;
  handleCloseModal: () => void;
};

export default function MoveCard({ card, handleCloseModal }: Props) {
  const { boardId } = useParams();
  const [selectedBoardId, setSelectedBoardId] = useState(boardId!);
  const [selectedListId, setSelectedListId] = useState(card.list);

  const allBoards = useAppSelector(selectAllBoards);

  const listsBySelectedBoardId = useAppSelector(
    selectListsdByBoardId(selectedBoardId)
  );
  const listByCurrentCard = useAppSelector((state) =>
    selectListById(state, card.list)
  );

  useEffect(() => {
    if (!listsBySelectedBoardId.length) {
      setSelectedListId("");
    } else if (listByCurrentCard.board === selectedBoardId) {
      setSelectedListId(card.list);
    } else {
      setSelectedListId(listsBySelectedBoardId[0].id);
    }
  }, [selectedBoardId]);

  const dispatch = useAppDispatch();

  const renderedMenuItemBoard = allBoards.map((board) => (
    <MenuItem key={board.id} value={board.id}>
      {board.id === boardId ? (
        <>
          {board.title + " "}
          <Typography component="span" variant="body2" fontWeight={300}>
            (текущая)
          </Typography>
        </>
      ) : (
        board.title
      )}
    </MenuItem>
  ));

  const renderedMenuItemList = listsBySelectedBoardId.map((list) => (
    <MenuItem key={list.id} value={list.id}>
      {list.id === card.list ? (
        <>
          {list.title + " "}
          <Typography component="span" variant="body2" fontWeight={300}>
            (текущий)
          </Typography>
        </>
      ) : (
        list.title
      )}
    </MenuItem>
  ));

  const handleClick = () => {
    dispatch(cardUpdated({ id: card.id, changes: { list: selectedListId } }));
    handleCloseModal();
  };

  return (
    <>
      <ModalHeader title="Перемещение карточки" />
      <Typography variant="body2" mt={2} mb={1}>
        Выберете колонку
      </Typography>
      <Box mb={2}>
        <Typography fontWeight={600} variant="body2" mb={0.5}>
          Доска
        </Typography>
        <Select
          value={selectedBoardId}
          onChange={(e) => setSelectedBoardId(e.target.value)}
          size="small"
          fullWidth
          autoFocus
        >
          {renderedMenuItemBoard}
        </Select>
      </Box>
      <Box mb={2}>
        <Typography fontWeight={600} variant="body2" mb={0.5}>
          Список
        </Typography>
        <Select
          value={selectedListId}
          onChange={(e) => setSelectedListId(e.target.value)}
          fullWidth
          size="small"
          disabled={!listsBySelectedBoardId.length}
        >
          {renderedMenuItemList}
        </Select>
        {!listsBySelectedBoardId.length && (
          <FormHelperText error>Нет списков</FormHelperText>
        )}
      </Box>
      <Button
        variant="contained"
        size="small"
        onClick={handleClick}
        disabled={!listsBySelectedBoardId.length}
      >
        Переместить
      </Button>
    </>
  );
}
