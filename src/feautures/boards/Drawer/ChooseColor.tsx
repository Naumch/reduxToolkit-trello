import DrawerHeader from "./DrawerHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function ChooseColor({ handleClickPrev }: Props) {
  return (
    <>
      <DrawerHeader title="Цвета" handleClickPrev={handleClickPrev} />
      Цвета
    </>
  );
}
