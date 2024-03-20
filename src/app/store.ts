import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from "../feautures/boards/boardsSlice";
import listsReducer from "../feautures/lists/listsSlice";
import cardsReducer from "../feautures/cards/cardsSlice";
import marksReducer from "../feautures/marks/marksSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    marks: marksReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
