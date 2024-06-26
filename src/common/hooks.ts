import { KeyboardEvent } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import Color from "color";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const pressedEnter = (event: KeyboardEvent, callback: FunctionVoid) => {
  if (event.key === "Enter") {
    callback();
  }
};

export const generateUrlsPhotoUnsplash = (photo: PhotoUnsplash): BoardBackgroundPhoto => {
  const urls: BoardBackgroundPhoto = {
    urlMain:
      photo.urls.raw +
      `&w=${window.innerWidth}&dpr=${window.devicePixelRatio}`,
    urlThumb: photo.urls.thumb,
    contrastColorText: Color(photo.color).isLight() ? "black" : "white",
  };

 return urls
}

export const createTooltipTextForMark = (mark: Mark) => {
  return `Цвет: ${mark.colorName}, название: "${
    mark.title ? mark.title : "без названия"
  }"`;
}

