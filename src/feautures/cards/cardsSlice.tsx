import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: Card[] = [
  { id: nanoid(), title: "карточка", list: "1" },
  { id: nanoid(), title: "карточка", list: "1" },
  { id: nanoid(), title: "карточка", list: "1" },
];

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    cardAdded: {
      reducer(state, action: PayloadAction<Card>) {
        state.push(action.payload);
      },
      prepare({ title, listId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            list: listId,
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
  },
});

export default cardsSlice.reducer;

export const { cardAdded, cardsDeletedByListId, cardsMovedAnotherList } =
  cardsSlice.actions;

export const selectCardsdByListId = (state: RootState, listId: string) =>
  state.cards.filter((card) => listId === card.list);
