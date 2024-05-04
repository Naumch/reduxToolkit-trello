import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { green, yellow, orange, red, purple, blue } from "@mui/material/colors";

const tone = 400;

const marksInitial: Mark[] = [
  {
    id: nanoid(),
    title: "",
    board: "1",
    bgColor: green[tone],
    fontColor: "black",
    colorName: "зеленый",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    bgColor: yellow[tone],
    fontColor: "black",
    colorName: "желтый",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    bgColor: orange[tone],
    fontColor: "black",
    colorName: "оранжевый",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    bgColor: red[tone],
    fontColor: "black",
    colorName: "красный",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    bgColor: purple[tone],
    fontColor: "black",
    colorName: "фиолетовый",
  },
  {
    id: nanoid(),
    title: "",
    board: "1",
    bgColor: blue[tone],
    fontColor: "black",
    colorName: "синий",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    bgColor: green[tone],
    fontColor: "black",
    colorName: "зеленый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    bgColor: yellow[tone],
    fontColor: "black",
    colorName: "желтый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    bgColor: orange[tone],
    fontColor: "black",
    colorName: "оранжевый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    bgColor: red[tone],
    fontColor: "black",
    colorName: "красный",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    bgColor: purple[tone],
    fontColor: "black",
    colorName: "фиолетовый",
  },
  {
    id: nanoid(),
    title: "",
    board: "2",
    bgColor: blue[tone],
    fontColor: "black",
    colorName: "синий",
  },
];

const initColors: ColorMark[] = [
  {
    bgColor: green[tone],
    fontColor: "black",
    colorName: "зеленый",
  },
  {
    bgColor: yellow[tone],
    fontColor: "black",
    colorName: "желтый",
  },
  {
    bgColor: orange[tone],
    fontColor: "black",
    colorName: "оранжевый",
  },
  {
    bgColor: red[tone],
    fontColor: "black",
    colorName: "красный",
  },
  {
    bgColor: purple[tone],
    fontColor: "black",
    colorName: "фиолетовый",
  },
  {
    bgColor: blue[tone],
    fontColor: "black",
    colorName: "синий",
  },
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
    marksAddedWhenCreatingBoard: {
      reducer(state, action: PayloadAction<Mark[]>) {
        marksAdapter.addMany(state, action.payload);
      },
      prepare({ boardId }) {
        const newMarks = initColors.map((color) => ({
          ...{ id: nanoid(), title: "", board: boardId },
          ...color,
        }));
        return {
          payload: newMarks,
        };
      },
    },
    markDeleted: marksAdapter.removeOne,
    markUpdated: marksAdapter.setOne,
    markAdded: marksAdapter.addOne,
  },
});

export default marksSlice.reducer;

export const {
  markDeleted,
  markUpdated,
  markAdded,
  marksAddedWhenCreatingBoard,
} = marksSlice.actions;

export const { selectAll: selectAllMarks } =
  marksAdapter.getSelectors<RootState>((state) => state.marks);

export const selectMarksdByBoardId = (boardId: string) =>
  createSelector(selectAllMarks, (marks) =>
    marks.filter((mark) => boardId === mark.board)
  );
