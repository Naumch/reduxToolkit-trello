import { useAppDispatch } from "../../../app/hooks";

import ModalContentDelete from "../../../components/ModalContentDelete";
import { cardsMovedToArchiveByListId } from "../../cards/cardsSlice";
import ModalHeader from "../../../components/ModalHeader";

type Props = {
  handleClickPrev: () => void;
  handleCloseModal: () => void;
  listId: string;
};

export default function MoveCardsToArchive({
  handleClickPrev,
  handleCloseModal,
  listId,
}: Props) {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(cardsMovedToArchiveByListId({ listId }));
    handleCloseModal();
  };

  return (
    <>
      <ModalHeader
        title="Архивировать все карточки списка?"
        handleClickPrev={handleClickPrev}
      />
      <ModalContentDelete
        text="Все карточки этого списка будут убраны с этой доски. Чтобы увидеть архивные карточки и вернуть их на доску, нажмите «Меню > Архив»."
        onClick={onClick}
        textButton="Архивировать всё"
      />
    </>
  );
}
