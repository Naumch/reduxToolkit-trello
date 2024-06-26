import { useState } from "react";

import { Stack, CardMedia, Card, Typography, Divider } from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import ChoosePhoto from "./ChoosePhoto";
import ChooseColor from "./ChooseColor";
import photosImg from "../../../images/photos.jpg";
import colorsImg from "../../../images/colors.png";

type Props = {
  handleClickPrev: FunctionVoid;
};

export default function ChangeBackground({ handleClickPrev }: Props) {
  const [isChoosingPhoto, setIsChoosingPhoto] = useState(false);
  const [isChoosingColor, setIsChoosingColor] = useState(false);

  if (isChoosingPhoto) {
    return <ChoosePhoto handleClickPrev={() => setIsChoosingPhoto(false)} />;
  }

  if (isChoosingColor) {
    return <ChooseColor handleClickPrev={() => setIsChoosingColor(false)} />;
  }

  return (
    <>
      <DrawerHeader title="Смена фона" handleClickPrev={handleClickPrev} />
      <Stack direction="row" gap={1} my={2}>
        <Card
          onClick={() => setIsChoosingPhoto(true)}
          sx={{ width: "50%", boxShadow: 0, cursor: "pointer" }}
        >
          <CardMedia
            component="img"
            alt="photos"
            height="100"
            image={photosImg}
            sx={{
              borderRadius: 2,
              opacity: 0.99,
              "&:hover": {
                opacity: 0.9,
              },
            }}
          />
          <Typography variant="body2" textAlign="center" mt={1}>
            Фотографии
          </Typography>
        </Card>
        <Card
          onClick={() => setIsChoosingColor(true)}
          sx={{ width: "50%", boxShadow: 0, cursor: "pointer" }}
        >
          <CardMedia
            component="img"
            alt="colors"
            height="100"
            image={colorsImg}
            sx={{
              borderRadius: 2,
              opacity: 0.99,
              "&:hover": {
                opacity: 0.9,
              },
            }}
          />
          <Typography variant="body2" textAlign="center" mt={1}>
            Цвета
          </Typography>
        </Card>
      </Stack>
      <Divider />
      <Typography fontWeight={500} mt={2}>
        Пользовательские
      </Typography>
    </>
  );
}
