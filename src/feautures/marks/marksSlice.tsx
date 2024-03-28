import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { green, yellow, orange, red, purple, blue } from "@mui/material/colors";

const tone = 400;

const marksInitial: Mark[] = [
  {
    id: nanoid(),
    title: "",
    bgColor: green[tone],
    fontColor: "black",
    colorName: "зеленый",
  },
  {
    id: nanoid(),
    title: "",
    bgColor: yellow[tone],
    fontColor: "black",
    colorName: "желтый",
  },
  {
    id: nanoid(),
    title: "",
    bgColor: orange[tone],
    fontColor: "black",
    colorName: "оранжевый",
  },
  {
    id: nanoid(),
    title: "",
    bgColor: red[tone],
    fontColor: "black",
    colorName: "красный",
  },
  {
    id: nanoid(),
    title: "",
    bgColor: purple[tone],
    fontColor: "black",
    colorName: "фиолетовый",
  },
  {
    id: nanoid(),
    title: "",
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
    markDeleted: marksAdapter.removeOne,
    markUpdated: marksAdapter.setOne,
    markAdded: marksAdapter.addOne,
  },
});

export default marksSlice.reducer;

export const { markDeleted, markUpdated, markAdded } = marksSlice.actions;

export const { selectAll: selectAllMarks } =
  marksAdapter.getSelectors<RootState>((state) => state.marks);
