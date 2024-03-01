import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: List[] = [
  { id: nanoid(), title: "Нужно сделать", board: "1" },
  { id: nanoid(), title: "В процессе", board: "1" },
  { id: nanoid(), title: "Готово", board: "1" },
];

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    listAdded: {
      reducer(state, action: PayloadAction<List>) {
        state.push(action.payload);
      },
      prepare({ title, boardId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            board: boardId,
          },
        };
      },
    },
    listDeleted(state, action: PayloadAction<{ id: string }>) {
      return state.filter((list) => list.id !== action.payload.id);
    },
  },
});

export default listsSlice.reducer;

export const { listAdded, listDeleted } = listsSlice.actions;

export const selectListsdByBoardId = (state: RootState, boardId: string) =>
  state.lists.filter((list) => boardId === list.board);
