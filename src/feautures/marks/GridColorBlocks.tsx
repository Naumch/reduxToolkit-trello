import { Dispatch, SetStateAction } from "react";
import { Box, Grid, Tooltip } from "@mui/material";
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
};

export default function GridColorBlocks({ mark, setMark }: Props) {
  const renderedColorBlocks = colors.map((color) => (
    <Tooltip
      title={color.colorName}
      disableInteractive
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundColor: color.bgColor,
          height: 40,
          minWidth: 50,
          borderRadius: 1,
          border: color.bgColor === mark.bgColor ? 2 : null,
          borderColor: "primary.main",
          "&:before":
            color.bgColor === mark.bgColor
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
        onClick={() => setMark({ ...mark, ...color })}
      />
    </Tooltip>
  ));

  return (
    <Grid container direction="column" gap={0.6} maxHeight={270} mb={2}>
      {renderedColorBlocks}
    </Grid>
  );
}
