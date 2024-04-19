import {
  nanoid,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const cardsInitial: Card[] = [
  { id: nanoid(), title: "Карточка", list: "1", board: "1", archive: true },
  { id: nanoid(), title: "карточка", list: "1", board: "1", archive: false },
  { id: nanoid(), title: "карточка", list: "1", board: "1", archive: false },
];

const cardsAdapter = createEntityAdapter<Card>();

const initialState = cardsAdapter.setAll(
  cardsAdapter.getInitialState(),
  cardsInitial
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    cardAdded: {
      reducer(state, action: PayloadAction<Card>) {
        cardsAdapter.addOne(state, action.payload);
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
    cardUpdated: cardsAdapter.updateOne,
    cardDeleted: cardsAdapter.removeOne,
    cardsMovedAnotherList(
      state,
      action: PayloadAction<{ currentListId: string; newListId: string }>
    ) {
      const { currentListId, newListId } = action.payload;

      Object.values(state.entities).forEach((card) => {
        if (card.list === currentListId) {
          card.list = newListId;
        }
      });
    },
    cardsMovedToArchiveByListId(
      state,
      action: PayloadAction<{ listId: string }>
    ) {
      const { listId } = action.payload;

      Object.values(state.entities).forEach((card) => {
        if (card.list === listId) {
          card.archive = true;
        }
      });
    },
  },
});

export default cardsSlice.reducer;

export const {
  cardAdded,
  cardUpdated,
  cardDeleted,
  cardsMovedToArchiveByListId,
  cardsMovedAnotherList,
} = cardsSlice.actions;

export const { selectAll: selectAllCards } =
  cardsAdapter.getSelectors<RootState>((state) => state.cards);

export const selectCardsdByListId = (listId: string) =>
  createSelector(selectAllCards, (cards) =>
    cards.filter((card) => card.list === listId && !card.archive)
  );

export const selectCardsdByBoardIdAndArchive = (boardId: string) =>
  createSelector(selectAllCards, (cards) =>
    cards.filter((card) => card.board === boardId && card.archive)
  );
