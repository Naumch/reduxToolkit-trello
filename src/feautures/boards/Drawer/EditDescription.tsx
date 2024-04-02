import DrawerHeader from "./DrawerHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function EditDescription({ handleClickPrev }: Props) {
  return (
    <>
      <DrawerHeader title="О доске" handleClickPrev={handleClickPrev} />
      Редактируем
    </>
  );
}
