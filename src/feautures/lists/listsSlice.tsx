import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: List[] = [
  { id: "1", title: "Нужно сделать", board: "1" },
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
      const { id } = action.payload;

      return state.filter((list) => list.id !== id);
    },
    listTitleUpdated(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const { id, title } = action.payload;
      const existingList = state.find((board) => board.id === id);

      if (existingList) {
        existingList.title = title;
      }
    },
  },
});

export default listsSlice.reducer;

export const { listAdded, listDeleted, listTitleUpdated } = listsSlice.actions;

export const selectListsdByBoardId = (state: RootState, boardId: string) =>
  state.lists.filter((list) => boardId === list.board);
