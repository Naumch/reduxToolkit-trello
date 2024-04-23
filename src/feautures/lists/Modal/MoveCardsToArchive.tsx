import ModalHeader from "./ModalHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function MoveCardsToArchive({ handleClickPrev }: Props) {
  return (
    <>
      <ModalHeader
        title="Архивировать все карточки списка?"
        handleClickPrev={handleClickPrev}
      />
    </>
  );
}
