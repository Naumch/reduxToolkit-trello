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
    board: "1",
    archive: false,
    sort: "old",
  },
  {
    id: nanoid(),
    title: "В процессе",
    board: "1",
    archive: true,
    sort: "new",
  },
  {
    id: nanoid(),
    title: "Готово",
    board: "1",
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
            board: boardId,
            archive: false,
            sort: "old" as Sorting,
          },
        };
      },
    },
    listUpdated: listsAdapter.updateOne,
    listCopyied(
      state,
      action: PayloadAction<{
        currentListId: string;
        newListId: string;
        title: string;
      }>
    ) {
      const { currentListId, newListId, title } = action.payload;

      const list = Object.values(state.entities).find(
        (list) => list.id === currentListId
      );

      if (list) {
        const copiedList = Object.assign({}, list);
        copiedList.id = newListId;
        copiedList.title = title;
        listsAdapter.addOne(state, copiedList);
      }
    },
  },
});

export default listsSlice.reducer;

export const { listAdded, listUpdated, listCopyied } = listsSlice.actions;

export const { selectAll: selectAllLists, selectById: selectListById } =
  listsAdapter.getSelectors<RootState>((state) => state.lists);

export const selectListsdByBoardId = (boardId: string) =>
  createSelector(selectAllLists, (lists) =>
    lists.filter((list) => boardId === list.board && !list.archive)
  );

export const selectListsdByBoardIdAndArchive = (boardId: string) =>
  createSelector(selectAllLists, (lists) =>
    lists.filter((list) => boardId === list.board && list.archive)
  );
