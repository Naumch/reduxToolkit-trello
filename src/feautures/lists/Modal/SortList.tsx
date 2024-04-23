import ModalHeader from "./ModalHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function SortList({ handleClickPrev }: Props) {
  return (
    <>
      <ModalHeader
        title="Сортировать колонку"
        handleClickPrev={handleClickPrev}
      />
    </>
  );
}
