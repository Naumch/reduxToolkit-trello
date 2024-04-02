import { useState } from "react";
import { Stack, CardMedia, Card, Typography, Divider } from "@mui/material";
import photosImg from "../../../images/photos.jpg";
import colorsImg from "../../../images/colors.png";
import ChoosePhoto from "./ChoosePhoto";
import ChooseColor from "./ChooseColor";
import DrawerHeader from "./DrawerHeader";

type Props = {
  handleClickPrev: () => void;
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
            sx={{ borderRadius: 2 }}
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
            sx={{ borderRadius: 2 }}
          />
          <Typography variant="body2" textAlign="center" mt={1}>
            Цвета
          </Typography>
        </Card>
      </Stack>
      <Divider />
      <Typography variant="h6" mt={2}>
        Пользовательские
      </Typography>
    </>
  );
}
