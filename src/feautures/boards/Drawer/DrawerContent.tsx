import { ReactNode, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../common/hooks";
import { boardDeleted } from "../boardsSlice";

import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import ModalWrapper from "../../../components/ModalWrapper";
import ModalHeader from "../../../components/ModalHeader";
import ModalContentDelete from "../../../components/ModalContentDelete";
import OpenMarks from "./OpenMarks";
import ChangeBackground from "./ChangeBackground";
import OpenArchive from "./OpenArchive";
import EditDescription from "./EditDescription";
import DrawerHeader from "./DrawerHeader";

type Props = {
  board: Board;
};

type Actions = {
  id: string;
  icon: ReactNode;
  text: string;
  func: FunctionVoid;
  divider: boolean;
};

export default function DrawerMenuContent({ board }: Props) {
  const [boardAction, setBoardAction] = useState<BoardAction>("default");
  const [openModalForDeleteBoard, setOpenModalForDeleteBoard] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickPrev = () => setBoardAction("default");

  const actions: Actions[] = [
    {
      id: nanoid(),
      icon: <InfoOutlinedIcon />,
      text: "О доске",
      func: () => setBoardAction("editDescription"),
      divider: false,
    },
    {
      id: nanoid(),
      icon: <ArchiveOutlinedIcon />,
      text: "Архив",
      func: () => setBoardAction("openArchive"),
      divider: true,
    },
    {
      id: nanoid(),
      icon: (
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundImage:
              typeof board.background === "object"
                ? `url(${board.background.urls.thumb})`
                : board.background,
            backgroundSize: "cover",
            borderRadius: 1,
          }}
        />
      ),
      text: "Сменить фон",
      func: () => setBoardAction("changeBackground"),
      divider: false,
    },
    {
      id: nanoid(),
      icon: <BookmarkBorderOutlinedIcon />,
      text: "Метки",
      func: () => setBoardAction("openMarks"),
      divider: true,
    },
    {
      id: nanoid(),
      icon: <DeleteOutlineOutlinedIcon />,
      text: "Удалить доску",
      func: () => setOpenModalForDeleteBoard(true),
      divider: false,
    },
  ];

  const renderedBoardActions = actions.map((action) => (
    <div key={action.id}>
      <ListItemButton onClick={action.func}>
        <ListItemIcon>{action.icon}</ListItemIcon>
        <ListItemText>{action.text}</ListItemText>
      </ListItemButton>
      {action.divider && <Divider />}
    </div>
  ));

  if (boardAction === "editDescription") {
    return <EditDescription handleClickPrev={handleClickPrev} />;
  } else if (boardAction === "openArchive") {
    return <OpenArchive handleClickPrev={handleClickPrev} />;
  } else if (boardAction === "changeBackground") {
    return <ChangeBackground handleClickPrev={handleClickPrev} />;
  } else if (boardAction === "openMarks") {
    return <OpenMarks handleClickPrev={handleClickPrev} />;
  } else {
    return (
      <>
        <Box sx={{ py: 2 }}>
          <Typography align="center" fontWeight={500}>
            Меню
          </Typography>
        </Box>
        <Divider />
        <List>{renderedBoardActions}</List>
        <ModalWrapper
          open={openModalForDeleteBoard}
          onClose={() => setOpenModalForDeleteBoard(false)}
        >
          <ModalHeader title="Удалить доску?" />
          <ModalContentDelete
            text="Доска будет удалена навсегда. Это действие нельзя отменить."
            onClick={() => {
              dispatch(boardDeleted(board.id));
              navigate("/");
            }}
          />
        </ModalWrapper>
      </>
    );
  }
}
