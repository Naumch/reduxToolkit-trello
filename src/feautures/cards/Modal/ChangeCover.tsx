import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  LinearProgress,
  ImageListItem,
  ImageListItemBar,
  Link,
} from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";
import {
  red,
  pink,
  purple,
  blue,
  cyan,
  green,
  lime,
  yellow,
  orange,
  blueGrey,
} from "@mui/material/colors";
import Label from "../../../components/Label";
import { ContextModalCard } from "../CardItem";
import ButtonSecondary from "../../../components/ButtonSecondary";
import SampleCoverCard from "./SampleCoverCard";
import { useAppDispatch } from "../../../common/hooks";
import { cardUpdated } from "../cardsSlice";
import { getRequestUnsplashAPI } from "../../../common/apiUnsplash";

const tone = 400;

const colors = [
  red[tone],
  purple[tone],
  lime[tone],
  blue[tone],
  yellow[tone],
  green[tone],
  cyan[tone],
  pink[tone],
  orange[tone],
  blueGrey[200],
];

export default function ChangeCover() {
  const { card } = useContext(ContextModalCard);
  const [sampleCover, setSampleCover] = useState(card.cover);
  const [photos, setPhotos] = useState<PhotoUnsplash[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cardUpdated({ id: card.id, changes: { cover: sampleCover } }));
  }, [sampleCover]);

  useEffect(() => {
    const fetchDataForPhotos = async () => {
      try {
        const photosData = await getRequestUnsplashAPI(6);
        setPhotos(photosData);
        setError(null);
      } catch (error) {
        setError("Ошибка при получении фото");
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForPhotos();
  }, []);

  const renderedColorBlocks = colors.map((color) => (
    <Box
      key={color}
      onClick={() => {
        setSampleCover((prevState) =>
          prevState ? { ...prevState, color } : { color, size: "half" }
        );
      }}
      sx={{
        position: "relative",
        backgroundColor: color,
        height: 34,
        minWidth: 56,
        borderRadius: 1,
        border: sampleCover && color === sampleCover.color ? 2 : null,
        borderColor: "primary.main",
        "&:before":
          sampleCover && color === sampleCover.color
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: 2,
                borderRadius: 0.5,
                borderColor: "white",
              }
            : null,
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8,
        },
      }}
    />
  ));

  const renderedPhotos = photos.map((photo) => (
    <ImageListItem
      key={photo.id}
      sx={{ cursor: "pointer", border: "none", padding: 0 }}
      component="button"
    >
      <img
        src={photo.urls.thumb}
        alt={photo.alt}
        loading="lazy"
        style={{ borderRadius: "4px", height: "60px" }}
      />
      <ImageListItemBar
        sx={{ height: 20 }}
        subtitle={
          <Link
            color="inherit"
            component="a"
            href={photo.user.links.html}
            target="_blank"
          >
            {photo.user.name}
          </Link>
        }
      />
    </ImageListItem>
  ));

  return (
    <>
      <ModalHeader title="Обложка" />
      <Box mt={1} mb={2}>
        <Label text="Размер" />
        <SampleCoverCard
          sampleCover={sampleCover}
          setSampleCover={setSampleCover}
        />
        {sampleCover && (
          <ButtonSecondary
            text="Убрать обложку"
            onClick={() => setSampleCover(null)}
            fullWidth
          />
        )}
      </Box>
      <Box mb={2}>
        <Label text="Цвета" />
        <Grid container direction="column" gap={0.6} maxHeight={76}>
          {renderedColorBlocks}
        </Grid>
      </Box>
      <Box>
        <Label text="Изображения из базы Unsplash" />
        {isLoading && <LinearProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container direction="column" gap={0.8} maxHeight={130}>
          {renderedPhotos}
        </Grid>
      </Box>
    </>
  );
}
