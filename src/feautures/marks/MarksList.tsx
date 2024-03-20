import { Box, Stack, Tooltip, Typography, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import Modal from "./ModalAddMark";

export default function MarksList() {
  const marks = useAppSelector((state) => state.marks);
  const [mark, setMark] = useState<Mark>(marks[0]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (mark: Mark) => {
    setMark(mark);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const renderedMarks = marks.map((mark) => {
    const titleTooltip = `Цвет: ${mark.colorName}, название: "${
      mark.title ? mark.title : "без названия"
    }"`;

    return (
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <Tooltip title={titleTooltip}>
          <Box
            sx={{
              width: "100%",
              height: 36,
              mb: 0.5,
              mr: 0.5,
              borderRadius: 1,
              backgroundColor: mark.color,
              cursor: "pointer",
            }}
            key={mark.id}
            onClick={() => handleOpenModal(mark)}
          />
        </Tooltip>
        <IconButton onClick={() => handleOpenModal(mark)}>
          <EditOutlinedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    );
  });

  return (
    <>
      <Typography mb={1} variant="body2">
        Метки
      </Typography>
      <Stack>{renderedMarks}</Stack>
      <Modal mark={mark} handleClose={handleCloseModal} open={openModal} />
    </>
  );
}
