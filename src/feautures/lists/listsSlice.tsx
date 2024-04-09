import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: List[] = [
  { id: "1", title: "Нужно сделать", board: "1", archive: false },
  { id: nanoid(), title: "В процессе", board: "1", archive: true },
  { id: nanoid(), title: "Готово", board: "1", archive: true },
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
            archive: false,
          },
        };
      },
    },
    listToggleArchive(state, action: PayloadAction<{ listId: string }>) {
      const { listId } = action.payload;
      const existingList = state.find((list) => list.id === listId);

      if (existingList) {
        existingList.archive = !existingList.archive;
      }
    },
    listTitleUpdated(
      state,
      action: PayloadAction<{ listId: string; title: string }>
    ) {
      const { listId, title } = action.payload;
      const existingList = state.find((list) => list.id === listId);

      if (existingList) {
        existingList.title = title;
      }
    },
  },
});

export default listsSlice.reducer;

export const { listAdded, listToggleArchive, listTitleUpdated } =
  listsSlice.actions;

export const selectListsdByBoardId = (state: RootState, boardId: string) =>
  state.lists.filter((list) => boardId === list.board && !list.archive);

export const selectListsdByBoardIdAndArchive = (
  state: RootState,
  boardId: string
) => state.lists.filter((list) => boardId === list.board && list.archive);
