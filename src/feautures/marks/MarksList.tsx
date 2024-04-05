import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllMarks } from "./marksSlice";
import store from "../../app/store";

import { Box, Stack, Typography, IconButton, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { green } from "@mui/material/colors";

import ModalContent from "./ModalAddMark";
import ModalWrapper from "../../components/ModalWrapper";
import MarkItem from "./MarkItem";
import DrawerHeader from "../boards/Drawer/DrawerHeader";

type Props = {
  handleClickPrev: () => void;
};

const newMark: Mark = {
  id: nanoid(),
  title: "",
  bgColor: green[400],
  fontColor: "black",
  colorName: "зеленый",
};

export default function MarksList({ handleClickPrev }: Props) {
  const marks = selectAllMarks(store.getState());

  const [openModal, setOpenModal] = useState(false);
  const [editableMark, setEditableMark] = useState<Mark>(newMark);
  const [isCreatingNewMark, setIsCreatingNewMark] = useState(false);

  const handleOpenModal = (mark: Mark) => {
    setEditableMark(mark);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditableMark(newMark);
    setIsCreatingNewMark(false);
  };

  const renderedMarks = marks.map((mark) => (
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <MarkItem
        mark={mark}
        onClick={() => handleOpenModal(mark)}
        hoverChanges
      />
      <IconButton sx={{ ml: 0.5 }} onClick={() => handleOpenModal(mark)}>
        <EditOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  ));

  return (
    <>
      <DrawerHeader title="Метки" handleClickPrev={handleClickPrev} />
      <Typography my={1} variant="body2">
        Метки
      </Typography>
      <Stack mb={2}>{renderedMarks}</Stack>
      <Button
        onClick={() => {
          setIsCreatingNewMark(true);
          setOpenModal(true);
        }}
        fullWidth
        variant="contained"
      >
        Создать новую метку
      </Button>
      <ModalWrapper title="Метки" open={openModal} onClose={handleCloseModal}>
        <ModalContent
          mark={editableMark}
          setMark={setEditableMark}
          handleCloseModal={handleCloseModal}
          isCreatingNewMark={isCreatingNewMark}
        />
      </ModalWrapper>
    </>
  );
}
