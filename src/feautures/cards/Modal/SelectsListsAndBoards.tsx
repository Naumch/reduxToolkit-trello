import {
  Typography,
  Select,
  MenuItem,
  Box,
  FormHelperText,
} from "@mui/material";
import { useAppSelector } from "../../../common/hooks";
import { selectAllBoards } from "../../boards/boardsSlice";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ContextModalCard } from "../CardItem";
import { selectListById, selectListsdByBoardId } from "../../lists/listsSlice";
import { useParams } from "react-router-dom";

type Props = {
  selectedBoardId: string;
  setSelectedBoardId: Dispatch<SetStateAction<string>>;
  selectedListId: string;
  setSelectedListId: Dispatch<SetStateAction<string>>;
  autofocus?: boolean;
};

export default function SelectsListsAndBoards({
  selectedBoardId,
  setSelectedBoardId,
  selectedListId,
  setSelectedListId,
  autofocus,
}: Props) {
  const { card } = useContext(ContextModalCard);
  const { boardId } = useParams();

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

  return (
    <>
      <Box mb={2}>
        <Typography fontWeight={600} variant="body2" mb={0.5}>
          Доска
        </Typography>
        <Select
          value={selectedBoardId}
          onChange={(e) => setSelectedBoardId(e.target.value)}
          size="small"
          fullWidth
          autoFocus={autofocus}
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
    </>
  );
}
