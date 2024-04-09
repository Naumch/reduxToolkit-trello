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
      prepare({ boardId, title, color }) {
        return {
          payload: {
            id: boardId,
            title,
            color,
            favourites: false,
          },
        };
      },
    },
    boardTitleUpdated(
      state,
      action: PayloadAction<{ boardId: string; title: string }>
    ) {
      const { boardId, title } = action.payload;
      const existingBoard = state.find((board) => board.id === boardId);

      if (existingBoard) {
        existingBoard.title = title;
      }
    },
    boardToggleFavourites(state, action: PayloadAction<{ boardId: string }>) {
      const { boardId } = action.payload;
      const existingBoard = state.find((board) => board.id === boardId);

      if (existingBoard) {
        existingBoard.favourites = !existingBoard.favourites;
      }
    },
    boardDeleted(state, action: PayloadAction<{ boardId: string }>) {
      const { boardId } = action.payload;

      return state.filter((board) => board.id !== boardId);
    },
  },
});

export const { boardAdded, boardTitleUpdated, boardToggleFavourites, boardDeleted } =
  boardsSlice.actions;

export default boardsSlice.reducer;

export const selectAllBoards = (state: RootState) => state.boards;
export const selectBoardById = (state: RootState, boardId: string) =>
  state.boards.find((board) => boardId === board.id);
