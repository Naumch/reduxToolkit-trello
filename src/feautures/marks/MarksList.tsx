import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectMarksdByBoardId } from "./marksSlice";

import { Box, Stack, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import ModalContent from "./ModalAddMark";
import ModalWrapper from "../../components/ModalWrapper";
import MarkItem from "./MarkItem";

import ButtonEdit from "../../components/ButtonEdit";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import ModalHeader from "../../components/ModalHeader";

export default function MarksList() {
  const { boardId } = useParams();

  const newMark: Mark = {
    id: nanoid(),
    title: "",
    board: boardId!,
    bgColor: green[400],
    fontColor: "black",
    colorName: "зеленый",
  };

  const marks = useAppSelector(selectMarksdByBoardId(boardId!));

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
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
      <MarkItem
        mark={mark}
        onClick={() => handleOpenModal(mark)}
        hoverChanges
      />
      <ButtonEdit onClick={() => handleOpenModal(mark)} />
    </Box>
  ));

  return (
    <>
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
      <ModalWrapper open={openModal} onClose={handleCloseModal}>
        <ModalHeader title="Метки" />
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
