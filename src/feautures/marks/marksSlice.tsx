import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { green, yellow, orange, red, purple, blue } from "@mui/material/colors";
import { boardAdded } from "../boards/boardsSlice";

const tone = 400;

const marksInitial: Mark[] = [
  {
    id: "1",
    title: "",
    board: "1",
    color: green[tone],
    colorName: "зеленый",
  },
  {
    id: "2",
    title: "test2",
    board: "1",
    color: yellow[tone],
    colorName: "желтый",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    color: orange[tone],
    colorName: "оранжевый",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    color: red[tone],
    colorName: "красный",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    color: purple[tone],
    colorName: "фиолетовый",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    color: blue[tone],
    colorName: "синий",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    color: green[tone],
    colorName: "зеленый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    color: yellow[tone],
    colorName: "желтый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    color: orange[tone],
    colorName: "оранжевый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    color: red[tone],
    colorName: "красный",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    color: purple[tone],
    colorName: "фиолетовый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    color: blue[tone],
    colorName: "синий",
  },
];

const initColors: ColorMark[] = [
  { color: green[tone], colorName: "зеленый" },
  { color: yellow[tone], colorName: "желтый" },
  { color: orange[tone], colorName: "оранжевый" },
  { color: red[tone], colorName: "красный" },
  { color: purple[tone], colorName: "фиолетовый" },
  { color: blue[tone], colorName: "синий" },
];

const marksAdapter = createEntityAdapter<Mark>();

const initialState = marksAdapter.setAll(
  marksAdapter.getInitialState(),
  marksInitial
);

const marksSlice = createSlice({
  name: "marks",
  initialState,
  reducers: {
    markDeleted: marksAdapter.removeOne,
    markUpdated: marksAdapter.setOne,
    markAdded: marksAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(boardAdded, (state, action) => {
      const { id } = action.payload;

      const newMarks = initColors.map((color) => ({
        ...{ id: nanoid(), title: "", board: id, card: [] },
        ...color,
      }));

      marksAdapter.addMany(state, newMarks);
    });
  },
});

export default marksSlice.reducer;

export const { markDeleted, markUpdated, markAdded } = marksSlice.actions;

export const { selectAll: selectAllMarks, selectById: selectMarkById } =
  marksAdapter.getSelectors<RootState>((state) => state.marks);

export const selectMarksdByBoardId = (boardId: string) =>
  createSelector(selectAllMarks, (marks) =>
    marks.filter((mark) => boardId === mark.board)
  );
