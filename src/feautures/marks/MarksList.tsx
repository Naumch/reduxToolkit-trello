import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectAllMarks } from "./marksSlice";
import store from "../../app/store";

import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import { green } from "@mui/material/colors";

import ModalContent from "./ModalAddMark";
import ModalWrapper from "../../components/ModalWrapper";
import MarkItem from "./MarkItem";

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
      <MarkItem mark={mark} onClick={() => handleOpenModal(mark)} />
      <IconButton sx={{ ml: 0.5 }} onClick={() => handleOpenModal(mark)}>
        <EditOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  ));

  return (
    <>
      <Box sx={{ py: 2 }}>
        <IconButton
          sx={{ position: "absolute", top: 12 }}
          onClick={handleClickPrev}
        >
          <ChevronLeftOutlinedIcon htmlColor="black" />
        </IconButton>
        <Typography align="center" variant="h6">
          Метки
        </Typography>
      </Box>
      <Divider />
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
          setIsCreatingNewMark={setIsCreatingNewMark}
        />
      </ModalWrapper>
    </>
  );
}
