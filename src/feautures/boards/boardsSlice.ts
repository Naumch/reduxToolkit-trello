import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: Board[] = [
  {
    id: "1",
    title: "Test",
    color: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    favourites: false,
  },
  {
    id: "2",
    title: "Test2",
    color: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    favourites: true,
  },
];

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    boardAdded: {
      reducer(state, action: PayloadAction<Board>) {
        state.push(action.payload);
      },
      prepare({ id, title, color }) {
        return {
          payload: {
            id,
            title,
            color,
            favourites: false,
          },
        };
      },
    },
    boardTitleUpdated(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const { id, title } = action.payload;
      const existingBoard = state.find((board) => board.id === id);

      if (existingBoard) {
        existingBoard.title = title;
      }
    },
    toggleFavourites(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const existingBoard = state.find((board) => board.id === id);

      if (existingBoard) {
        existingBoard.favourites = !existingBoard.favourites;
      }
    },
    boardDeleted(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;

      return state.filter((board) => board.id !== id);
    },
  },
});

export const { boardAdded, boardTitleUpdated, toggleFavourites, boardDeleted } =
  boardsSlice.actions;

export default boardsSlice.reducer;

export const selectAllBoards = (state: RootState) => state.boards;
export const selectBoardById = (state: RootState, boardId: string) =>
  state.boards.find((board) => boardId === board.id);
