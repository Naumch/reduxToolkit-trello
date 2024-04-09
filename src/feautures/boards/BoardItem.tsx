import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { boardToggleFavourites } from "./boardsSlice";

import { Box, Typography, IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  board: Board;
};

export default function BoardItem({ board }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box
      key={board.id}
      onClick={() => navigate(board.id)}
      sx={{
        width: 200,
        height: 100,
        backgroundImage: board.color,
        position: "relative",
        border: 1,
        boxShadow: 1,
        borderRadius: 1,
        cursor: "pointer",
        padding: 1,
        transition: ".3s",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Typography variant="h5">{board.title}</Typography>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          dispatch(boardToggleFavourites({ boardId: board.id }));
        }}
        sx={{ position: "absolute", bottom: 4, right: 4 }}
      >
        {board.favourites ? (
          <StarIcon sx={{ fill: "orange", fontSize: 20 }} />
        ) : (
          <StarBorderIcon sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Box>
  );
}
