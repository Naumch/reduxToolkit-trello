import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { generateUrlsPhotoUnsplash, useAppDispatch } from "../../app/hooks";
import { boardAdded } from "./boardsSlice";

import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import SampleBoard from "./SampleBoard";
import ModalWrapper from "../../components/ModalWrapper";
import ModalHeader from "../../components/ModalHeader";
import { getRequestUnsplashAPI } from "../../app/apiUnsplash";
import ButtonSecondary from "../../components/ButtonSecondary";
import BoxSampleBackground from "./BoxSampleBackground";

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
  const [photos, setPhotos] = useState<PhotoUnsplash[]>([]);
  const [background, setBackground] = useState<string | BoardBackgroundPhoto>(
    gradients[0]
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataForPhotos = async () => {
      try {
        const photosData = await getRequestUnsplashAPI(4);
        setPhotos(photosData);
      } catch (error) {
        console.error(error);
        setPhotos([]);
      }
    };

    fetchDataForPhotos();
  }, []);

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
      <ButtonSecondary
        onClick={() => setOpenModal(true)}
        text="Создать доску"
        sx={{ width: 200, height: 100 }}
      />
      <ModalWrapper open={openModal} onClose={handleCloseModal}>
        <ModalHeader title="Создать доску" />
        <SampleBoard background={background} />
        <Box mb={3}>
          <Typography variant="body2" mb={0.5}>
            Фон
          </Typography>
          <Stack direction="row" spacing={0.8} mb={0.6}>
            {gradients.map((gradient) => (
              <BoxSampleBackground
                key={gradient}
                background={gradient}
                onClick={() => setBackground(gradient)}
                withIcon={gradient === background}
                style={{
                  width: 50,
                  height: 35,
                  "&:hover": {
                    filter: "brightness(0.9)",
                  },
                }}
              />
            ))}
          </Stack>
          <Stack direction="row" spacing={0.6}>
            {photos.map((photo) => (
              <BoxSampleBackground
                key={photo.id}
                background={`url(${photo.urls.thumb})`}
                onClick={() => setBackground(generateUrlsPhotoUnsplash(photo))}
                withIcon={
                  typeof background === "object" &&
                  photo.urls.thumb === background.urlThumb
                }
                style={{
                  width: 80,
                  height: 46,
                  "&:hover": {
                    filter: "brightness(0.75)",
                  },
                }}
              />
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
