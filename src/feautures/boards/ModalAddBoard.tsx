import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { boardAdded } from "./boardsSlice";

import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SampleBoard from "./SampleBoard";
import ModalWrapper from "../../components/ModalWrapper";

const gradients = [
  "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
  "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
];

export default function ModalAddBoard() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(gradients[0]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setColor(gradients[0]);
  };

  const createNewBoard = () => {
    const id = nanoid();
    dispatch(boardAdded({ title, id, color }));
    navigate(id);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
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
      <ModalWrapper title="Создать доску" open={open} onClose={handleClose}>
        <SampleBoard color={color} />
        <Box mb={3}>
          <Typography variant="body2" fontWeight={500} mb={0.5}>
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
                onClick={() => setColor(gradient)}
              >
                {gradient === color && <DoneIcon />}
              </Box>
            ))}
          </Stack>
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={500}>
            Заголовок доски
          </Typography>
          <TextField
            size="small"
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            helperText="Укажите название доски"
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
