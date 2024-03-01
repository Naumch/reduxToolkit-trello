import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { boardTitleUpdated, toggleFavourites } from "./boardsSlice";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  board: Board;
};

export default function Header({ board }: Props) {
  const [value, setValue] = useState(board.title);
  const [edit, setEdit] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(boardTitleUpdated({ id: board.id, title: value }));
    setEdit(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: board.color,
        boxShadow: 1,
        filter: "brightness(90%)",
        minHeight: 80,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container sx={{ display: "flex", alignItems: "center" }}>
        {edit ? (
          <>
            <TextField
              onChange={(e) => setValue(e.target.value)}
              size="small"
              value={value}
              sx={{ backgroundColor: "white", mr: 2 }}
            />
            <Button variant="contained" onClick={handleClick}>
              сохранить
            </Button>
          </>
        ) : (
          <>
            <Box
              onClick={() => setEdit(true)}
              sx={{
                cursor: "pointer",
                padding: "8px 16px",
                display: "inline-block",
                borderRadius: 1,
                backgroundColor: board.color,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Typography variant="h5" component="span">
                {board.title}
              </Typography>
            </Box>
          </>
        )}
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => dispatch(toggleFavourites({ id: board.id }))}
        >
          {board.favourites ? (
            <StarIcon sx={{ fill: "orange", fontSize: 20 }} />
          ) : (
            <StarBorderIcon sx={{ fontSize: 20 }} />
          )}
        </IconButton>
      </Container>
    </Box>
  );
}
