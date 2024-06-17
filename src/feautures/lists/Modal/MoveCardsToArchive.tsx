import { useAppDispatch } from "../../../common/hooks";

import ModalContentDelete from "../../../components/ModalContentDelete";
import { cardsMovedToArchive } from "../../cards/cardsSlice";
import ModalHeader from "../../../components/ModalHeader";
import { useContext } from "react";
import { ContextModalList } from "../ListItem";

export default function MoveCardsToArchive() {
  const { listId, handleClickPrev, handleCloseModal } =
    useContext(ContextModalList);

  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cardsMovedToArchive({ listId }));
    handleCloseModal();
  };

  const text =
    "Все карточки этого списка будут убраны с этой доски. Чтобы увидеть архивные карточки и вернуть их на доску, нажмите «Меню > Архив».";

  return (
    <>
      <ModalHeader
        title="Архивировать все карточки списка?"
        handleClickPrev={handleClickPrev}
      />
      <ModalContentDelete
        text={text}
        onClick={onClick}
        textButton="Архивировать всё"
      />
    </>
  );
}
