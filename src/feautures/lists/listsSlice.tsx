import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const listsInitial: List[] = [
  { id: "1", title: "Нужно сделать", board: "1", archive: false },
  { id: nanoid(), title: "В процессе", board: "1", archive: true },
  { id: nanoid(), title: "Готово", board: "1", archive: true },
];

const listsAdapter = createEntityAdapter<List>();

const initialState = listsAdapter.setAll(
  listsAdapter.getInitialState(),
  listsInitial
);

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    listAdded: {
      reducer(state, action: PayloadAction<List>) {
        listsAdapter.addOne(state, action.payload);
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
    listUpdated: listsAdapter.updateOne,
  },
});

export default listsSlice.reducer;

export const { listAdded, listUpdated } = listsSlice.actions;

export const { selectAll: selectAllLists } =
  listsAdapter.getSelectors<RootState>((state) => state.lists);

export const selectListsdByBoardId = (boardId: string) =>
  createSelector(selectAllLists, (lists) =>
    lists.filter((list) => boardId === list.board && !list.archive)
  );

export const selectListsdByBoardIdAndArchive = (boardId: string) =>
  createSelector(selectAllLists, (lists) =>
    lists.filter((list) => boardId === list.board && list.archive)
  );
