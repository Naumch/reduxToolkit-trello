import { useState } from "react";
import { useAppDispatch, pressedEnter } from "../../common/hooks";
import { boardUpdated } from "./boardsSlice";

import {
  Box,
  Typography,
  TextField,
  IconButton,
  Container,
  Stack,
  Drawer,
  Checkbox,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DrawerContent from "./Drawer/DrawerContent";

type Props = {
  board: Board;
};

export default function Header({ board }: Props) {
  const [title, setTitle] = useState(board.title);
  const [isEditing, setIsEditing] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useAppDispatch();

  const updateTitle = () => {
    if (title) {
      dispatch(boardUpdated({ id: board.id, changes: { title } }));
    } else {
      setTitle(board.title);
    }
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        boxShadow: 1,
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
            <Checkbox
              checked={board.favourites}
              icon={<StarBorderIcon />}
              checkedIcon={<StarIcon sx={{ fill: "orange" }} />}
              size="small"
              sx={{ ml: 1 }}
              onClick={() =>
                dispatch(
                  boardUpdated({
                    id: board.id,
                    changes: { favourites: !board.favourites },
                  })
                )
              }
            />
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
          <Box
            sx={{ width: 320, px: 1, position: "relative" }}
            role="presentation"
          >
            <IconButton
              sx={{ position: "absolute", right: 8, top: 10 }}
              onClick={() => setOpenDrawer(false)}
            >
              <CloseIcon fontSize="small" htmlColor="black" />
            </IconButton>
            <DrawerContent board={board} />
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
}
