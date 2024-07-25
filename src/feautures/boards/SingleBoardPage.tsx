import { useParams } from "react-router-dom";
import { useAppSelector } from "../../common/hooks";
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
        backgroundImage:
          typeof board.background === "object"
            ? `url(${board.background.urls.raw})`
            : board.background,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Header board={board} />
      <Box sx={{ overflowX: "scroll", height: "calc(100vh - 80px)" }}>
        <Container>
          <ListsStack boardId={board.id} />
        </Container>
      </Box>
    </Box>
  );
}
