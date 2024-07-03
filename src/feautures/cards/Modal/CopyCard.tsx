import { useContext, useState } from "react";
import ModalHeader from "../../../components/ModalHeader";
import { ContextModalCard } from "../CardItem";
import { TextField, Checkbox, FormControlLabel, Box } from "@mui/material";
import ButtonMain from "../../../components/ButtonMain";
import SelectsListsAndBoards from "./SelectsListsAndBoards";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { cardAdded } from "../cardsSlice";
import { selectListsdByBoardId } from "../../lists/listsSlice";
import Label from "../../../components/Label";

export default function CopyCard() {
  const { boardId } = useParams();
  const { card, handleCloseModal } = useContext(ContextModalCard);

  const [title, setTitle] = useState(card.title);
  const [checkedMarks, setCheckedMarks] = useState(true);
  const [selectedBoardId, setSelectedBoardId] = useState(boardId!);
  const [selectedListId, setSelectedListId] = useState(card.list);

  const dispatch = useAppDispatch();
  const listsBySelectedBoardId = useAppSelector(
    selectListsdByBoardId(selectedBoardId)
  );

  return (
    <>
      <ModalHeader title="Копирование карточки" />
      <Box my={2}>
        <Label text="Название" />
        <TextField
          multiline
          minRows={3}
          maxRows={8}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          fullWidth
          size="small"
          placeholder={card.title}
        />
      </Box>
      {card.marks.length ? (
        <Box mb={2}>
          <Label text="Также копировать…" />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedMarks}
                onChange={(e) => setCheckedMarks(e.target.checked)}
              />
            }
            label={`Метки (${card.marks.length})`}
          />
        </Box>
      ) : null}
      <Box mb={2}>
        <Label text="Копировать в…" />
        <SelectsListsAndBoards
          selectedBoardId={selectedBoardId}
          setSelectedBoardId={setSelectedBoardId}
          selectedListId={selectedListId}
          setSelectedListId={setSelectedListId}
        />
      </Box>
      <ButtonMain
        text="Создать карточку"
        onClick={() => {
          dispatch(
            cardAdded({
              title: title ? title : card.title,
              listId: selectedListId,
              marks: checkedMarks ? card.marks : [],
            })
          );
          handleCloseModal();
        }}
        disabled={!listsBySelectedBoardId.length}
      />
    </>
  );
}
