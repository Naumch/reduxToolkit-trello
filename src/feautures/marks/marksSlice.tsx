import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: Mark[] = [
  {
    id: nanoid(),
    color: "#4bce97",
    colorName: "Зелёная",
    title: "Hello",
  },
  {
    id: nanoid(),
    color: "#f5cd47",
    colorName: "Жёлтая",
    title: "World",
  },
  {
    id: nanoid(),
    color: "#fea362",
    colorName: "Оранжевая",
    title: "",
  },
  {
    id: nanoid(),
    color: "#f87168",
    colorName: "Красная",
    title: "",
  },
  {
    id: nanoid(),
    color: "#9f8fef",
    colorName: "Пурпурная",
    title: "",
  },
  { id: nanoid(), color: "#579dff", colorName: "Синяя", title: "" },
];

const marksSlice = createSlice({
  name: "marks",
  initialState,
  reducers: {},
});

export default marksSlice.reducer;

export const {} = marksSlice.actions;

export const selectMarkById = (state: RootState, markId: string) =>
  state.marks.find((mark) => markId === mark.id);
