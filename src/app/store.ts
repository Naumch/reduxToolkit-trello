import { configureStore } from "@reduxjs/toolkit";

import boardsReducer from "../feautures/boards/boardsSlice";
import listsReducer from "../feautures/lists/listsSlice";

const store = configureStore({
  reducer: { boards: boardsReducer, lists: listsReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
