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
};

type Card = {
  id: string;
  title: string;
  list: string;
};
