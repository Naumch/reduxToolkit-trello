type Board = {
  id: string;
  title: string;
  color: string;
  favourites: boolean;
};

type List = {
  id: string;
  title: string;
  board: {id: string, position: number}
  archive: boolean
  sort: Sorting
};

type Card = {
  id: string;
  title: string;
  list: string;
  archive: boolean
  time: string
};

interface ColorMark {
  bgColor: string;
  fontColor: "white" | "black";
  colorName: string;
}

interface Mark extends ColorMark {
  id: string;
  title: string;
  board: string
}

type Sorting = "new" | "old" | "alphabet"

type CardAction = "openCard" 
| "changeMarks" 
| "changeCover" 
| "changeDate" 
| "moveCard" 
| "copyCard"
