import { useState } from "react";

import { useAppDispatch, pressedEnter } from "../../app/hooks";
import { boardTitleUpdated, toggleFavourites } from "./boardsSlice";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

import {
  Box,
  Typography,
  TextField,
  IconButton,
  Container,
  Stack,
  Drawer,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DrawerMenuContent from "./DrawerMenuContent";

type Props = {
  board: Board;
};

export default function Header({ board }: Props) {
  const [title, setTitle] = useState(board.title);
  const [isEditing, setIsEditing] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useAppDispatch();

  const updateTitle = () => {
    dispatch(boardTitleUpdated({ id: board.id, title }));
    setIsEditing(false);
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
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {isEditing ? (
              <ClickAwayListener onClickAway={updateTitle}>
                <TextField
                  onChange={(event) => setTitle(event.target.value)}
                  size="small"
                  value={title}
                  sx={{ backgroundColor: "white", mr: 2 }}
                  onKeyDown={(event) => pressedEnter(event, updateTitle)}
                />
              </ClickAwayListener>
            ) : (
              <Box
                onClick={() => setIsEditing(true)}
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
          </Box>
          <IconButton>
            <MoreHorizOutlinedIcon onClick={() => setOpenDrawer(true)} />
          </IconButton>
        </Stack>
        <Drawer
          anchor="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <DrawerMenuContent board={board} setOpenDrawer={setOpenDrawer} />
        </Drawer>
      </Container>
    </Box>
  );
}
