type Board = {
  id: string;
  title: string;
  background: string | PhotoUnsplash
  favourites: boolean;
  description?: string
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
  deadline?: number
  marks: string[]
  cover: null | CoverCardColor | CoverCardPhoto
};

type CoverCardColor = {
  color: string, 
  size: "half" | "full"
}

type CoverCardPhoto = {
  url: string, 
  size: "half" | "full"
  colorText?: "white" | "black"
}

type Mark = {
  id: string;
  title: string;
  board: string
  color: string;
  colorName: string;
}

type ColorMark = Pick<Mark,  "color" | "colorName">

type PhotoUnsplash = {
  id: string;
  alt: string;
  color: string;
  urls: {
    thumb: string;
    raw: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
};

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

type FunctionVoid = () => void
