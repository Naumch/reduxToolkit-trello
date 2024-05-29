import { useEffect, useState } from "react";
import DrawerHeader from "./DrawerHeader";
import {
  Alert,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  LinearProgress,
  Link,
} from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { boardUpdated } from "../boardsSlice";
import { useParams } from "react-router-dom";

type Props = {
  handleClickPrev: () => void;
};

type Photo = {
  id: string;
  alt: string;
  urls: {
    thumb: string;
    regular: string;
    raw: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
};

export default function ChoosePhoto({ handleClickPrev }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { boardId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getRandomPhotos() {
      const accessKey = "iFtaen0uWARw-5L9HdN3Rzv5BFhbTJWnnjygBbAEsQw";

      const url =
        "https://api.unsplash.com/photos/random/?topics=bo8jQKTaE0Y;count=20;orientation=landscape";

      const headers = new Headers({
        "Accept-Version": "v1",
        Authorization: `Client-ID ${accessKey}`,
      });

      try {
        setError(null);
        setIsLoading(true);

        const response = await fetch(url, { headers });

        if (response.ok) {
          const photos = await response.json();
          setPhotos(photos);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError("Ошибка при получении фото");
        }
      } catch (error) {
        setIsLoading(false);
        setError("Ошибка при получении фото");
      }
    }

    getRandomPhotos();
  }, []);

  const renderedPhotos = photos.map((photo) => (
    <ImageListItem
      key={photo.id}
      sx={{ cursor: "pointer", border: "none", padding: 0 }}
      component="button"
      onClick={() =>
        dispatch(
          boardUpdated({
            id: boardId!,
            changes: {
              color:
                photo.urls.raw +
                `&w=${window.innerWidth}&dpr=${window.devicePixelRatio}`,
            },
          })
        )
      }
    >
      <img
        src={photo.urls.thumb}
        alt={photo.alt}
        loading="lazy"
        style={{ borderRadius: "4px", height: "96px" }}
      />
      <ImageListItemBar
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
      <DrawerHeader title="Фотографии" handleClickPrev={handleClickPrev} />
      {isLoading && <LinearProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <ImageList gap={8}>{renderedPhotos}</ImageList>
    </>
  );
}
