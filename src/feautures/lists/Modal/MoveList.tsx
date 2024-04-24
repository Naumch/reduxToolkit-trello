import ModalHeader from "../../../components/ModalHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function MoveList({ handleClickPrev }: Props) {
  return (
    <>
      <ModalHeader
        title="Перемещение списка"
        handleClickPrev={handleClickPrev}
      />
    </>
  );
}
