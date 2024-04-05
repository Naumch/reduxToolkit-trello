import { ReactNode, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Button,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppDispatch } from "../../../app/hooks";
import { boardDeleted } from "../boardsSlice";
import MarksList from "../../marks/MarksList";
import ModalWrapper from "../../../components/ModalWrapper";
import ChangeBackground from "./ChangeBackground";
import OpenArchive from "./OpenArchive";
import EditDescription from "./EditDescription";

type Props = {
  board: Board;
};

type Actions = {
  id: string;
  icon: ReactNode;
  text: string;
  func: () => void;
  divider: boolean;
};

export default function DrawerMenuContent({ board }: Props) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isOpeningArchive, setIsOpeningArchive] = useState(false);
  const [isChangingBackground, setIsChangingBackground] = useState(false);
  const [isOpeningMarks, setIsOpeningMarks] = useState(false);
  const [isDeletingBoard, setIsDeletingBoard] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const actions: Actions[] = [
    {
      id: nanoid(),
      icon: <InfoOutlinedIcon />,
      text: "О доске",
      func: () => setIsEditingDescription(true),
      divider: false,
    },
    {
      id: nanoid(),
      icon: <ArchiveOutlinedIcon />,
      text: "Архив",
      func: () => setIsOpeningArchive(true),
      divider: true,
    },
    {
      id: nanoid(),
      icon: (
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundImage: board.color,
            borderRadius: 1,
          }}
        />
      ),
      text: "Сменить фон",
      func: () => setIsChangingBackground(true),
      divider: false,
    },
    {
      id: nanoid(),
      icon: <BookmarkBorderOutlinedIcon />,
      text: "Метки",
      func: () => setIsOpeningMarks(true),
      divider: true,
    },
    {
      id: nanoid(),
      icon: <DeleteOutlineOutlinedIcon />,
      text: "Удалить доску",
      func: () => setIsDeletingBoard(true),
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

  if (isEditingDescription) {
    return (
      <EditDescription handleClickPrev={() => setIsEditingDescription(false)} />
    );
  }

  if (isOpeningArchive) {
    return <OpenArchive handleClickPrev={() => setIsOpeningArchive(false)} />;
  }

  if (isChangingBackground) {
    return (
      <ChangeBackground
        handleClickPrev={() => setIsChangingBackground(false)}
      />
    );
  }

  if (isOpeningMarks) {
    return <MarksList handleClickPrev={() => setIsOpeningMarks(false)} />;
  }

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
        open={isDeletingBoard}
        onClose={() => setIsDeletingBoard(false)}
        title="Удалить доску"
      >
        <Typography textAlign="center" my={2}>
          Доска будет удалена навсегда. Это действие нельзя отменить.
        </Typography>
        <Button
          color="error"
          fullWidth
          variant="contained"
          onClick={() => {
            dispatch(boardDeleted({ id: board.id }));
            navigate("/");
          }}
        >
          Удалить
        </Button>
      </ModalWrapper>
    </>
  );
}
