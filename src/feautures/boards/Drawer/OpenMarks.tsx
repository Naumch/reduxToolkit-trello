import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { selectMarksdByBoardId } from "../../marks/marksSlice";

import { Box, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import ModalWorkWithMarks from "../../marks/ModalWorkWithMarks";
import ModalWrapper from "../../../components/ModalWrapper";
import SampleMark from "../../marks/SampleMark";

import ButtonEdit from "../../../components/ButtonEdit";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../common/hooks";
import ModalHeader from "../../../components/ModalHeader";
import ButtonSecondary from "../../../components/ButtonSecondary";
import DrawerHeader from "./DrawerHeader";
import Label from "../../../components/Label";

type Props = {
  handleClickPrev: FunctionVoid;
};

export default function OpenMarks({ handleClickPrev }: Props) {
  const { boardId } = useParams();

  const newMark: Mark = {
    id: nanoid(),
    title: "",
    board: boardId!,
    color: green[400],
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

  const renderedSampleMarks = marks.map((mark) => (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
      <SampleMark
        mark={mark}
        onClick={() => handleOpenModal(mark)}
        hoverChanges
      />
      <ButtonEdit onClick={() => handleOpenModal(mark)} />
    </Box>
  ));

  return (
    <>
      <DrawerHeader title="Метки" handleClickPrev={handleClickPrev} />
      <Label text="Метки" sx={{ mt: 1 }} />
      <Stack mb={2}>{renderedSampleMarks}</Stack>
      <ButtonSecondary
        onClick={() => {
          setIsCreatingNewMark(true);
          setOpenModal(true);
        }}
        text="Создать новую метку"
        fullWidth
      />
      <ModalWrapper open={openModal} onClose={handleCloseModal}>
        <ModalHeader title="Метки" />
        <ModalWorkWithMarks
          mark={editableMark}
          setMark={setEditableMark}
          handleCloseModal={handleCloseModal}
          isCreatingNewMark={isCreatingNewMark}
        />
      </ModalWrapper>
    </>
  );
}
