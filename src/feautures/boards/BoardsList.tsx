import { useAppSelector } from "../../app/hooks";
import { selectAllBoards } from "./boardsSlice";

import { Box, Container, Grid } from "@mui/material";
import ModalAddBoard from "./ModalAddBoard";
import BoardsListTitle from "./BoardsListTitle";
import BoardItem from "./BoardItem";
import { useEffect } from "react";

export default function BoardsList() {
  const boards = useAppSelector(selectAllBoards);
  const favouritesBoards = boards.filter((board) => board.favourites);

  const renderedAllBoards = boards.map((board) => <BoardItem board={board} />);
  const renderedFavouritesBoards = favouritesBoards.map((board) => (
    <BoardItem board={board} />
  ));

  return (
    <Container>
      {favouritesBoards.length ? (
        <Box mt={6}>
          <BoardsListTitle title="Отмеченные доски" />
          <Grid container mt={2} gap={1}>
            {renderedFavouritesBoards}
          </Grid>
        </Box>
      ) : null}
      <Box mt={6}>
        <BoardsListTitle title="Мои доски" />
        <Grid container mt={2} gap={1}>
          {renderedAllBoards}
          <ModalAddBoard />
        </Grid>
      </Box>
    </Container>
  );
}
