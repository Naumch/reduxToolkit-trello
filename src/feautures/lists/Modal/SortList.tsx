import { List, ListItemButton, ListItemText, Snackbar } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import { useAppDispatch } from "../../../app/hooks";
import { listUpdated } from "../listsSlice";
import { nanoid } from "@reduxjs/toolkit";

type Props = {
  listId: string;
  handleClickPrev: () => void;
  handleCloseModal: () => void;
};

type Item = {
  id: string;
  text: string;
  sort: Sorting;
};

const listItems: Item[] = [
  { id: nanoid(), text: "Дата создания (сначала новые)", sort: "new" },
  { id: nanoid(), text: "Дата создания (сначала старые)", sort: "old" },
  { id: nanoid(), text: "Название карточки (по алфавиту)", sort: "alphabet" },
];

export default function SortList({
  listId,
  handleClickPrev,
  handleCloseModal,
}: Props) {
  const dispatch = useAppDispatch();

  const renderedListItems = listItems.map((item) => (
    <ListItemButton
      key={item.id}
      onClick={() => {
        dispatch(listUpdated({ id: listId, changes: { sort: item.sort } }));
        handleCloseModal();
      }}
    >
      <ListItemText>{item.text}</ListItemText>
    </ListItemButton>
  ));

  return (
    <>
      <ModalHeader
        title="Сортировать колонку"
        handleClickPrev={handleClickPrev}
      />
      <List>{renderedListItems}</List>
    </>
  );
}