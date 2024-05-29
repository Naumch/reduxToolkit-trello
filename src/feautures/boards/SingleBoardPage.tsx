import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectBoardById } from "./boardsSlice";

import ListsStack from "../lists/ListsStack";
import Header from "./SingleBoardHeader";
import { Box, Container } from "@mui/material";

export default function SingleBoardPage() {
  const { boardId } = useParams();
  const board = useAppSelector((state) => selectBoardById(state, boardId!));

  if (!board) {
    return <div>Board Not Found</div>;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: board.color.includes("unsplash")
          ? `url(${board.color})`
          : board.color,
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header board={board} />
      <Container>
        <ListsStack boardId={board.id} />
      </Container>
    </Box>
  );
}
