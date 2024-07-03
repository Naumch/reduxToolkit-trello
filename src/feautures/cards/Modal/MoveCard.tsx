import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { selectListsdByBoardId } from "../../lists/listsSlice";
import { cardUpdated } from "../cardsSlice";
import { ContextModalCard } from "../CardItem";
import ButtonMain from "../../../components/ButtonMain";
import SelectsListsAndBoards from "./SelectsListsAndBoards";
import ModalHeader from "../../../components/ModalHeader";
import Label from "../../../components/Label";

export default function MoveCard() {
  const { card, handleCloseModal } = useContext(ContextModalCard);
  const { boardId } = useParams();
  const [selectedBoardId, setSelectedBoardId] = useState(boardId!);
  const [selectedListId, setSelectedListId] = useState(card.list);

  const listsBySelectedBoardId = useAppSelector(
    selectListsdByBoardId(selectedBoardId)
  );

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(cardUpdated({ id: card.id, changes: { list: selectedListId } }));
    handleCloseModal();
  };

  return (
    <>
      <ModalHeader title="Перемещение карточки" />
      <Label text="Выберете колонку" sx={{ mt: 2 }} />
      <SelectsListsAndBoards
        selectedBoardId={selectedBoardId}
        setSelectedBoardId={setSelectedBoardId}
        selectedListId={selectedListId}
        setSelectedListId={setSelectedListId}
        autofocus
      />
      <ButtonMain
        text="Переместить"
        onClick={handleClick}
        disabled={!listsBySelectedBoardId.length}
      />
    </>
  );
}
