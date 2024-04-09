import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: Card[] = [
  { id: nanoid(), title: "карточка", list: "1", board: "1", archive: true },
  { id: nanoid(), title: "карточка", list: "1", board: "1", archive: false },
  { id: nanoid(), title: "карточка", list: "1", board: "1", archive: false },
];

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    cardAdded: {
      reducer(state, action: PayloadAction<Card>) {
        state.push(action.payload);
      },
      prepare({ title, listId, boardId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            list: listId,
            board: boardId,
            archive: false,
          },
        };
      },
    },
    cardsDeletedByListId(state, action: PayloadAction<{ listId: string }>) {
      const { listId } = action.payload;
      return state.filter((card) => card.list !== listId);
    },
    cardsMovedAnotherList(
      state,
      action: PayloadAction<{ currentListId: string; newListId: string }>
    ) {
      const { currentListId, newListId } = action.payload;

      state.forEach((card) => {
        if (card.list === currentListId) {
          card.list = newListId;
        }
      });
    },
    cardToggleArchive(state, action: PayloadAction<{ cardId: string }>) {
      const { cardId } = action.payload;
      const existingCard = state.find((card) => card.id === cardId);

      if (existingCard) {
        existingCard.archive = !existingCard.archive;
      }
    },
  },
});

export default cardsSlice.reducer;

export const {
  cardAdded,
  cardsDeletedByListId,
  cardsMovedAnotherList,
  cardToggleArchive,
} = cardsSlice.actions;

export const selectCardsdByListId = (state: RootState, listId: string) =>
  state.cards.filter((card) => listId === card.list && !card.archive);

export const selectCardsdByBoardIdAndArchive = (
  state: RootState,
  boardId: string
) => state.cards.filter((card) => boardId === card.board && card.archive);
