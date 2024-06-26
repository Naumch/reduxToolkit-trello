import DrawerHeader from "./DrawerHeader";

type Props = {
  handleClickPrev: FunctionVoid;
};

export default function ChooseColor({ handleClickPrev }: Props) {
  return (
    <>
      <DrawerHeader title="Цвета" handleClickPrev={handleClickPrev} />
      Цвета
    </>
  );
}
