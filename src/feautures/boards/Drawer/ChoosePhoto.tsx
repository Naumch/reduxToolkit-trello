import DrawerHeader from "./DrawerHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function ChoosePhoto({ handleClickPrev }: Props) {
  return (
    <>
      <DrawerHeader title="Фотографии" handleClickPrev={handleClickPrev} />
      Фотографии
    </>
  );
}
