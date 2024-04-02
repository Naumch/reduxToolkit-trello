import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectBoardById } from "./boardsSlice";

import ListsStack from "../lists/ListsStack";
import Header from "./SingleBoardHeader";
import { Container } from "@mui/material";

export default function SingleBoardPage() {
  const { boardId } = useParams();
  const board = useAppSelector((state) => selectBoardById(state, boardId!));

  useEffect(() => {
    document.body.style.backgroundImage = board!.color;
  });

  if (!board) {
    return <div>Board Not Found</div>;
  }

  return (
    <>
      <Header board={board} />
      <Container>
        <ListsStack boardId={board.id} />
      </Container>
    </>
  );
}
