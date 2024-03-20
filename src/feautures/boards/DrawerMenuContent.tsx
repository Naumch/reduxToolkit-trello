import { Dispatch, SetStateAction, ReactNode, useState } from "react";
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

import { useAppDispatch } from "../../app/hooks";
import { boardDeleted } from "./boardsSlice";
import DrawerMenuContentWrapper from "./DrawerMenuContentWrapper";
import MarksList from "../marks/MarksList";
import ModalWrapper from "../../components/ModalWrapper";

type Props = {
  board: Board;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
};

type Actions = {
  id: string;
  icon: ReactNode;
  text: string;
  func: () => void;
  divider: boolean;
};

export default function DrawerMenuContent({ board, setOpenDrawer }: Props) {
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
      <DrawerMenuContentWrapper
        title="О доске"
        setOpenDrawer={setOpenDrawer}
        onClick={() => setIsEditingDescription(false)}
      ></DrawerMenuContentWrapper>
    );
  }

  if (isOpeningArchive) {
    return (
      <DrawerMenuContentWrapper
        title="Архив"
        setOpenDrawer={setOpenDrawer}
        onClick={() => setIsOpeningArchive(false)}
      ></DrawerMenuContentWrapper>
    );
  }

  if (isChangingBackground) {
    return (
      <DrawerMenuContentWrapper
        title="Смена фона"
        setOpenDrawer={setOpenDrawer}
        onClick={() => setIsChangingBackground(false)}
      >
        Hello
      </DrawerMenuContentWrapper>
    );
  }

  if (isOpeningMarks) {
    return (
      <DrawerMenuContentWrapper
        title="Метки"
        setOpenDrawer={setOpenDrawer}
        onClick={() => setIsOpeningMarks(false)}
      >
        <MarksList />
      </DrawerMenuContentWrapper>
    );
  }

  return (
    <DrawerMenuContentWrapper
      title="Меню"
      setOpenDrawer={setOpenDrawer}
      onClick={() => console.log("test")}
    >
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
    </DrawerMenuContentWrapper>
  );
}
