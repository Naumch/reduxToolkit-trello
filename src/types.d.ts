type Board = {
  id: string;
  title: string;
  background: string | BoardBackgroundPhoto
  favourites: boolean;
  description?: string
};

type BoardBackgroundPhoto = {
  urlMain: string
  urlThumb: string
  contrastColorText: string
}

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
  marks: string[]
  cover: boolean
};

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
