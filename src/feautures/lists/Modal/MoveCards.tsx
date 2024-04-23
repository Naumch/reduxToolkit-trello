import ModalHeader from "./ModalHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function MoveCards({ handleClickPrev }: Props) {
  return (
    <>
      <ModalHeader
        title="Переместить все карточки в список"
        handleClickPrev={handleClickPrev}
      />
    </>
  );
}
