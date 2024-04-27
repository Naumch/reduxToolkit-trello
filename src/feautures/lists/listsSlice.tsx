import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const listsInitial: List[] = [
  {
    id: "1",
    title: "Нужно сделать",
    board: { id: "1", position: 1 },
    archive: false,
    sort: "old",
  },
  {
    id: nanoid(),
    title: "В процессе",
    board: { id: "1", position: 2 },
    archive: true,
    sort: "new",
  },
  {
    id: nanoid(),
    title: "Готово",
    board: { id: "1", position: 3 },
    archive: true,
    sort: "alphabet",
  },
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
            board: { id: boardId, position: 10 },
            archive: false,
            sort: "old" as Sorting,
          },
        };
      },
    },
    listUpdated: listsAdapter.updateOne,
  },
});

export default listsSlice.reducer;

export const { listAdded, listUpdated } = listsSlice.actions;

export const { selectAll: selectAllLists, selectById: selectListById } =
  listsAdapter.getSelectors<RootState>((state) => state.lists);

export const selectListsdByBoardId = (boardId: string) =>
  createSelector(selectAllLists, (lists) =>
    lists.filter((list) => boardId === list.board.id && !list.archive)
  );

export const selectListsdByBoardIdAndArchive = (boardId: string) =>
  createSelector(selectAllLists, (lists) =>
    lists.filter((list) => boardId === list.board.id && list.archive)
  );
