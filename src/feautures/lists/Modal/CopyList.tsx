import ModalHeader from "../../../components/ModalHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function CopyList({ handleClickPrev }: Props) {
  return (
    <>
      <ModalHeader
        title="Копирование списка"
        handleClickPrev={handleClickPrev}
      />
    </>
  );
}
