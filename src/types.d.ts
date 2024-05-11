type Board = {
  id: string;
  title: string;
  color: string;
  favourites: boolean;
};

type List = {
  id: string;
  title: string;
  board: string
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

type BoardAction = "default" 
| "editDescription" 
| "openArchive" 
| "changeBackground" 
| "openMarks" 

type ListAction = "default" 
| "copyList" 
| "moveCards" 
| "moveCardsToArchive" 
| "moveList" 
| "sortList"

type CardAction = "openCard" 
| "changeMarks" 
| "changeCover" 
| "changeDate" 
| "moveCard" 
| "copyCard"


