import { KeyboardEvent } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const pressedEnter = (event: KeyboardEvent, callback: () => void) => {
  if (event.key === "Enter") {
    callback();
  }
};
