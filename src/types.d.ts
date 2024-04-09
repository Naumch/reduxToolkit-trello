type Board = {
  id: string;
  title: string;
  color: string;
  favourites: boolean;
};

type List = {
  id: string;
  title: string;
  board: string;
  archive: boolean
};

type Card = {
  id: string;
  title: string;
  list: string;
  board: string;
  archive: boolean
};

interface ColorMark {
  bgColor: string;
  fontColor: "white" | "black";
  colorName: string;
}

interface Mark extends ColorMark {
  id: string;
  title: string;
}
