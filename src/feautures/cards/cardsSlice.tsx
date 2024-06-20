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
    title:
      "С посадок https://sovcombank.ru/apply/credit/upload-documents/ https://sovcombank.ru/apply/credit/resturn-documents/поступают задачки в пайрус без вложения.",
    list: "1",
    archive: false,
    time: new Date().toISOString(),
    marks: ["1", "2"],
  },
  {
    id: nanoid(),
    title:
      "Обновить страницу https://halvacard.ru/order/card-procent-na-ostatok/",
    list: "1",
    archive: false,
    time: new Date().toISOString(),
    marks: [],
  },
  {
    id: nanoid(),
    title: "Тесты на выход за пределы экрана",
    list: "1",
    archive: false,
    time: new Date().toISOString(),
    marks: [],
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
            marks: [],
          },
        };
      },
    },
    cardUpdated: cardsAdapter.updateOne,
    cardDeleted: cardsAdapter.removeOne,
    cardsMovedToAnotherList(
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
    cardsMovedToArchive(state, action: PayloadAction<{ listId: string }>) {
      const { listId } = action.payload;

      Object.values(state.entities).forEach((card) => {
        if (card.list === listId) {
          card.archive = true;
        }
      });
    },
    cardChangedMark(
      state,
      action: PayloadAction<{ cardId: string; markId: string }>
    ) {
      const { cardId, markId } = action.payload;
      const card = Object.values(state.entities).find(
        (card) => card.id === cardId
      );

      if (!card?.marks.includes(markId)) {
        card?.marks.push(markId);
      } else {
        card.marks = card?.marks.filter((mark) => mark !== markId);
      }
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
  cardsMovedToArchive,
  cardsMovedToAnotherList,
  cardChangedMark,
} = cardsSlice.actions;

export const { selectAll: selectAllCards, selectById: selectCardById } =
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
