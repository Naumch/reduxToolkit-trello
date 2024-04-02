import DrawerHeader from "./DrawerHeader";

type Props = {
  handleClickPrev: () => void;
};

export default function OpenArchive({ handleClickPrev }: Props) {
  return (
    <>
      <DrawerHeader title="Архив" handleClickPrev={handleClickPrev} />
      Архив
    </>
  );
}
