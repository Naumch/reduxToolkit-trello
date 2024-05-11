import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectListsdByBoardId } from "../listsSlice";
import { cardsMovedAnotherList } from "../../cards/cardsSlice";

import ModalHeader from "../../../components/ModalHeader";
import { List, ListItemButton, ListItemText } from "@mui/material";

type Props = {
  listId: string;
  handleClickPrev: () => void;
  handleCloseModal: () => void;
};

export default function MoveCards({
  listId,
  handleClickPrev,
  handleCloseModal,
}: Props) {
  const { boardId } = useParams();
  const lists = useAppSelector(selectListsdByBoardId(boardId!));
  const dispatch = useAppDispatch();

  return (
    <>
      <ModalHeader
        title="Переместить все карточки в список"
        handleClickPrev={handleClickPrev}
      />
      <List>
        {lists.map((list) =>
          list.id === listId ? (
            <ListItemButton disabled key={list.id} sx={{ pl: 4 }}>
              <ListItemText>{list.title} (текущая)</ListItemText>
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => {
                dispatch(
                  cardsMovedAnotherList({
                    currentListId: listId,
                    newListId: list.id,
                  })
                );
                handleCloseModal();
              }}
              key={list.id}
              sx={{ pl: 4 }}
            >
              <ListItemText>{list.title}</ListItemText>
            </ListItemButton>
          )
        )}
      </List>
    </>
  );
}
