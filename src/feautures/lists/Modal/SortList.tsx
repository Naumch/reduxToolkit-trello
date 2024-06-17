import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../common/hooks";
import { listUpdated } from "../listsSlice";

import { List, ListItemButton, ListItemText } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import { useContext } from "react";
import { ContextModalList } from "../ListItem";

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

export default function SortList() {
  const { listId, handleClickPrev, handleCloseModal } =
    useContext(ContextModalList);

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
