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
import {
  generateUrlsPhotoUnsplash,
  useAppDispatch,
} from "../../../common/hooks";
import { boardUpdated } from "../boardsSlice";
import { useParams } from "react-router-dom";
import { getRequestUnsplashAPI } from "../../../common/apiUnsplash";

type Props = {
  handleClickPrev: () => void;
};

export default function ChoosePhoto({ handleClickPrev }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [photos, setPhotos] = useState<PhotoUnsplash[]>([]);
  const { boardId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDataForPhotos = async () => {
      try {
        const photosData = await getRequestUnsplashAPI(20);
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

  const saveNewBackground = (photo: PhotoUnsplash) => {
    const background = generateUrlsPhotoUnsplash(photo);
    dispatch(boardUpdated({ id: boardId!, changes: { background } }));
  };

  const renderedPhotos = photos.map((photo) => (
    <ImageListItem
      key={photo.id}
      sx={{ cursor: "pointer", border: "none", padding: 0 }}
      component="button"
      onClick={() => saveNewBackground(photo)}
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

  const titleDrawer = (
    <>
      Фотографии{" "}
      <Link component="a" href="https://unsplash.com" target="_blank">
        Unsplash
      </Link>
    </>
  );

  return (
    <>
      <DrawerHeader title={titleDrawer} handleClickPrev={handleClickPrev} />
      {isLoading && <LinearProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <ImageList gap={8}>{renderedPhotos}</ImageList>
    </>
  );
}
