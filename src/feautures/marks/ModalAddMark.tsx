import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../app/hooks";
import { markAdded, markDeleted, markUpdated } from "./marksSlice";

import MarkItem from "./MarkItem";
import {
  Box,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import {
  green,
  yellow,
  orange,
  red,
  purple,
  blue,
  cyan,
  lime,
  pink,
  grey,
} from "@mui/material/colors";

const lightTone = 100;
const mediumTone = 400;
const darkTone = 700;
const lightText = "приглушенный ";
const darkText = "насыщенный ";

const colors: ColorMark[] = [
  {
    bgColor: green[lightTone],
    fontColor: "black",
    colorName: lightText + "зеленый",
  },
  {
    bgColor: green[mediumTone],
    fontColor: "black",
    colorName: "зеленый",
  },
  {
    bgColor: green[darkTone],
    fontColor: "white",
    colorName: darkText + "зеленый",
  },
  {
    bgColor: blue[lightTone],
    fontColor: "black",
    colorName: lightText + "синий",
  },
  {
    bgColor: blue[mediumTone],
    fontColor: "black",
    colorName: "синий",
  },
  {
    bgColor: blue[darkTone],
    fontColor: "white",
    colorName: darkText + "синий",
  },
  {
    bgColor: yellow[lightTone],
    fontColor: "black",
    colorName: lightText + "желтый",
  },
  {
    bgColor: yellow[mediumTone],
    fontColor: "black",
    colorName: "желтый",
  },
  {
    bgColor: yellow[darkTone],
    fontColor: "white",
    colorName: darkText + "желтый",
  },
  {
    bgColor: cyan[lightTone],
    fontColor: "black",
    colorName: lightText + "голубой",
  },
  {
    bgColor: cyan[mediumTone],
    fontColor: "black",
    colorName: "голубой",
  },
  {
    bgColor: cyan[darkTone],
    fontColor: "white",
    colorName: darkText + "голубой",
  },
  {
    bgColor: orange[lightTone],
    fontColor: "black",
    colorName: lightText + "оранжевый",
  },
  {
    bgColor: orange[mediumTone],
    fontColor: "black",
    colorName: "оранжевый",
  },
  {
    bgColor: orange[darkTone],
    fontColor: "white",
    colorName: darkText + "оранжевый",
  },
  {
    bgColor: lime[lightTone],
    fontColor: "black",
    colorName: lightText + "лаймовый",
  },
  {
    bgColor: lime[mediumTone],
    fontColor: "black",
    colorName: "лаймовый",
  },
  {
    bgColor: lime[darkTone],
    fontColor: "white",
    colorName: darkText + "лаймовый",
  },
  {
    bgColor: red[lightTone],
    fontColor: "black",
    colorName: lightText + "красный",
  },
  {
    bgColor: red[mediumTone],
    fontColor: "black",
    colorName: "красный",
  },
  {
    bgColor: red[darkTone],
    fontColor: "white",
    colorName: darkText + "красный",
  },
  {
    bgColor: pink[lightTone],
    fontColor: "black",
    colorName: lightText + "розовый",
  },
  {
    bgColor: pink[mediumTone],
    fontColor: "black",
    colorName: "розовый",
  },
  {
    bgColor: pink[darkTone],
    fontColor: "white",
    colorName: darkText + "розовый",
  },
  {
    bgColor: purple[lightTone],
    fontColor: "black",
    colorName: lightText + "фиолетовый",
  },
  {
    bgColor: purple[mediumTone],
    fontColor: "black",
    colorName: "фиолетовый",
  },
  {
    bgColor: purple[darkTone],
    fontColor: "white",
    colorName: darkText + "фиолетовый",
  },
  {
    bgColor: grey[lightTone],
    fontColor: "black",
    colorName: lightText + "серый",
  },
  {
    bgColor: grey[mediumTone],
    fontColor: "black",
    colorName: "серый",
  },
  {
    bgColor: grey[darkTone],
    fontColor: "white",
    colorName: darkText + "серый",
  },
];

type Props = {
  mark: Mark;
  setMark: Dispatch<SetStateAction<Mark>>;
  handleCloseModal: () => void;
  isCreatingNewMark: boolean;
  setIsCreatingNewMark: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddMark({
  mark,
  setMark,
  handleCloseModal,
  isCreatingNewMark,
  setIsCreatingNewMark,
}: Props) {
  const dispatch = useAppDispatch();

  const renderedColorBlocks = colors.map((color) => (
    <Tooltip title={color.colorName}>
      <Box
        sx={{
          backgroundColor: color.bgColor,
          height: 40,
          minWidth: 50,
          borderRadius: 1,
          border: color.bgColor === mark.bgColor ? 2 : null,
        }}
        onClick={() => setMark({ ...mark, ...color })}
      />
    </Tooltip>
  ));

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F7F8F9",
          height: 100,
          my: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MarkItem mark={mark} />
      </Box>
      <Typography my={1} variant="body2">
        Название
      </Typography>
      <TextField
        size="small"
        value={mark.title}
        onChange={(e) => setMark({ ...mark, title: e.target.value })}
        fullWidth
      />
      <Typography mt={2} mb={1} variant="body2">
        Цвет
      </Typography>
      <Grid container direction="column" gap={0.6} maxHeight={270} mb={2}>
        {renderedColorBlocks}
      </Grid>
      <Divider />
      {isCreatingNewMark ? (
        <Button
          onClick={() => {
            dispatch(markAdded(mark));
            handleCloseModal();
          }}
          sx={{ mt: 2 }}
          variant="contained"
          size="small"
        >
          Создание
        </Button>
      ) : (
        <Stack mt={2} justifyContent="space-between" direction="row">
          <Button
            onClick={() => {
              dispatch(markUpdated(mark));
              handleCloseModal();
            }}
            size="small"
            variant="contained"
          >
            Сохранить
          </Button>
          <Button
            onClick={() => {
              dispatch(markDeleted(mark.id));
              handleCloseModal();
            }}
            color="error"
            size="small"
            variant="contained"
          >
            Удалить
          </Button>
        </Stack>
      )}
    </>
  );
}
