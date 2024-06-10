import {
  nanoid,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { listCopied, selectListsdByBoardId } from "../lists/listsSlice";
import cloneDeep from "lodash/cloneDeep";

const cardsInitial: Card[] = [
  {
    id: nanoid(),
    title: "1",
    list: "1",
    archive: false,
    time: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: "2",
    list: "1",
    archive: false,
    time: new Date().toISOString(),
  },
  {
    id: nanoid(),
    title: "3",
    list: "1",
    archive: false,
    time: new Date().toISOString(),
  },
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
            time: new Date().toISOString(),
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
  extraReducers: (builder) => {
    builder.addCase(listCopied, (state, action) => {
      const { currentListId, newListId } = action.payload;

      const cards: Card[] = Object.values(state.entities).filter(
        (card) => card.list === currentListId
      );

      if (cards.length) {
        const copiedCards = cloneDeep(cards);
        copiedCards.forEach((card) => {
          card.id = nanoid();
          card.list = newListId;
        });

        cardsAdapter.addMany(state, copiedCards);
      }
    });
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
  createSelector(
    selectListsdByBoardId(boardId),
    selectAllCards,
    (lists, cards) => {
      const archiveCardsAtTheBoard: Card[] = [];
      lists.forEach((list) => {
        cards.forEach((card) => {
          if (card.list === list.id && card.archive) {
            archiveCardsAtTheBoard.push(card);
          }
        });
      });
      return archiveCardsAtTheBoard;
    }
  );
