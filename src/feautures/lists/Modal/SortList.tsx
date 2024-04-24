import { List, ListItemButton, ListItemText } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";

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
      <List>
        <ListItemButton>
          <ListItemText>Дата создания (сначала новые)</ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemText>Дата создания (сначала старые)</ListItemText>
        </ListItemButton>

        <ListItemButton>
          <ListItemText>Название карточки (по алфавиту)</ListItemText>
        </ListItemButton>
      </List>
    </>
  );
}
