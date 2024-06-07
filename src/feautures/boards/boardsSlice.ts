import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const boardsInitial: Board[] = [
  {
    id: "1",
    title: "Test",
    background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    favourites: false,
  },
  {
    id: "2",
    title: "Test2",
    background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    favourites: true,
  },
];

const boardsAdapter = createEntityAdapter<Board>()

const initialState = boardsAdapter.setAll(
  boardsAdapter.getInitialState(),
  boardsInitial
)

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    boardAdded: {
      reducer(state, action: PayloadAction<Board>) {
        boardsAdapter.addOne(state, action.payload)
      },
      prepare({ boardId, title, background }) {
        return {
          payload: {
            id: boardId,
            title,
            background,
            favourites: false,
          },
        };
      },
    },
    boardUpdated: boardsAdapter.updateOne,
    boardDeleted: boardsAdapter.removeOne
  },
});

export default boardsSlice.reducer;

export const { boardAdded, boardUpdated, boardDeleted } =
  boardsSlice.actions;

export const {selectAll: selectAllBoards, selectById: selectBoardById} = boardsAdapter.getSelectors<RootState>(state => state.boards)

