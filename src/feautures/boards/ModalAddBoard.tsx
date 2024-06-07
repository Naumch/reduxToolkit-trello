import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { boardAdded } from "./boardsSlice";

import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SampleBoard from "./SampleBoard";
import ModalWrapper from "../../components/ModalWrapper";
import ModalHeader from "../../components/ModalHeader";

const gradients = [
  "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
  "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
];

export default function ModalAddBoard() {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState(gradients[0]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpenModal(false);
    setTitle("");
    setBackground(gradients[0]);
  };

  const createNewBoard = () => {
    const boardId = nanoid();
    dispatch(boardAdded({ title, boardId, background }));
    navigate(boardId);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        sx={{
          width: 200,
          height: 100,
          border: 1,
          boxShadow: 1,
          borderRadius: 1,
          cursor: "pointer",
        }}
      >
        Создать доску
      </Button>
      <ModalWrapper open={openModal} onClose={handleCloseModal}>
        <ModalHeader title="Создать доску" />
        <SampleBoard background={background} />
        <Box mb={3}>
          <Typography variant="body2" mb={0.5}>
            Фон
          </Typography>
          <Stack direction="row" spacing={1}>
            {gradients.map((gradient) => (
              <Box
                sx={{
                  width: 50,
                  height: 35,
                  backgroundImage: gradient,
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": {
                    filter: "contrast(90%)",
                  },
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => setBackground(gradient)}
              >
                {gradient === background && <DoneIcon />}
              </Box>
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography variant="body2">Заголовок доски</Typography>
          <TextField
            size="small"
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            helperText="Укажите название доски"
            autoFocus
          />
        </Box>
        {title.trim() && (
          <Button variant="contained" fullWidth onClick={createNewBoard}>
            Создать
          </Button>
        )}
      </ModalWrapper>
    </>
  );
}
