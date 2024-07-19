import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  LinearProgress,
  ImageListItem,
  ImageListItemBar,
  Link,
  Stack,
} from "@mui/material";
import ModalHeader from "../../../../components/ModalHeader";
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
import Label from "../../../../components/Label";
import { ContextModalCard } from "../../CardItem";
import ButtonSecondary from "../../../../components/ButtonSecondary";
import SampleCoverCard from "./SampleCoverCard";
import { styleBlueBorder, useAppDispatch } from "../../../../common/hooks";
import { cardUpdated } from "../../cardsSlice";
import { getRequestUnsplashAPI } from "../../../../common/apiUnsplash";
import BoxChoiceColorText from "./BoxChoiceColorText";

const tone = 400;

const colorBlocks = [
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

  const [color, setColor] = useState(
    card.cover && "color" in card.cover ? card.cover.color : null
  );
  const [url, setUrl] = useState<string | null>(
    card.cover && "url" in card.cover ? card.cover.url : null
  );
  const [size, setSize] = useState<"half" | "full" | null>(
    card.cover ? card.cover.size : null
  );
  const [colorText, setColorText] = useState<"white" | "black" | undefined>(
    card.cover && "url" in card.cover && card.cover.size === "full"
      ? card.cover.colorText
      : undefined
  );
  const [photos, setPhotos] = useState<PhotoUnsplash[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (url && size === "full") {
      dispatch(
        cardUpdated({
          id: card.id,
          changes: {
            cover: { url, size, colorText: colorText ? colorText : "white" },
          },
        })
      );
    } else if (url && size === "half") {
      dispatch(cardUpdated({ id: card.id, changes: { cover: { url, size } } }));
    } else if (color && size) {
      dispatch(
        cardUpdated({ id: card.id, changes: { cover: { color, size } } })
      );
    } else {
      dispatch(cardUpdated({ id: card.id, changes: { cover: null } }));
    }
  }, [url, color, size, colorText]);

  const renderedColorBlocks = colorBlocks.map((colorBlock) => (
    <Box
      key={colorBlock}
      onClick={() => {
        setColor(colorBlock);
        setUrl(null);
        setSize((prevSize) => (prevSize ? prevSize : "half"));
      }}
      sx={[
        {
          backgroundColor: colorBlock,
          height: 34,
          minWidth: 56,
          borderRadius: 1,
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
        },
        color && colorBlock === color ? styleBlueBorder : null,
      ]}
    />
  ));

  const renderedPhotos = photos.map((photo) => (
    <ImageListItem
      key={photo.id}
      sx={[
        {
          cursor: "pointer",
          border: "none",
          padding: 0,
          borderRadius: 1,
          width: 100,
        },
        url && photo.urls.thumb === url ? styleBlueBorder : null,
      ]}
      component="button"
      onClick={() => {
        setUrl(photo.urls.thumb);
        setColor(null);
        setSize((prevSize) => (prevSize ? prevSize : "half"));
      }}
    >
      <img
        src={photo.urls.thumb}
        alt={photo.alt}
        loading="lazy"
        style={{
          borderRadius: "4px",
          height: url && photo.urls.thumb === url ? 56 : 60,
        }}
      />
      <ImageListItemBar
        sx={{ height: 20, borderRadius: "0 0 4px 4px" }}
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
          size={size}
          setSize={setSize}
          color={color}
          url={url}
        />
        {(color || url) && (
          <ButtonSecondary
            text="Убрать обложку"
            onClick={() => {
              setColor(null);
              setUrl(null);
              setSize(null);
            }}
            fullWidth
          />
        )}
      </Box>
      {url && size === "full" && (
        <Box mb={2}>
          <Label text="Цвет текста" />
          <Stack gap={1} direction="row">
            <BoxChoiceColorText
              colorText="white"
              selected={
                card.cover &&
                "url" in card.cover &&
                card.cover.colorText === "white"
              }
              onClick={() => setColorText("white")}
            />
            <BoxChoiceColorText
              colorText="black"
              selected={
                card.cover &&
                "url" in card.cover &&
                card.cover.colorText === "black"
              }
              onClick={() => setColorText("black")}
            />
          </Stack>
        </Box>
      )}
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
