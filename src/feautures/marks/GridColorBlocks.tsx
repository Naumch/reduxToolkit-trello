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
import { styleBlueBorder } from "../../common/hooks";

const lightTone = 100;
const mediumTone = 400;
const darkTone = 700;
const lightText = "приглушенный ";
const darkText = "насыщенный ";

const colorBlocks: ColorMark[] = [
  { color: green[lightTone], colorName: lightText + "зеленый" },
  { color: green[mediumTone], colorName: "зеленый" },
  { color: green[darkTone], colorName: darkText + "зеленый" },
  { color: blue[lightTone], colorName: lightText + "синий" },
  { color: blue[mediumTone], colorName: "синий" },
  { color: blue[darkTone], colorName: darkText + "синий" },
  { color: yellow[lightTone], colorName: lightText + "желтый" },
  { color: yellow[mediumTone], colorName: "желтый" },
  { color: yellow[darkTone], colorName: darkText + "желтый" },
  { color: cyan[lightTone], colorName: lightText + "голубой" },
  { color: cyan[mediumTone], colorName: "голубой" },
  { color: cyan[darkTone], colorName: darkText + "голубой" },
  { color: orange[lightTone], colorName: lightText + "оранжевый" },
  { color: orange[mediumTone], colorName: "оранжевый" },
  { color: orange[darkTone], colorName: darkText + "оранжевый" },
  { color: lime[lightTone], colorName: lightText + "лаймовый" },
  { color: lime[mediumTone], colorName: "лаймовый" },
  { color: lime[darkTone], colorName: darkText + "лаймовый" },
  { color: red[lightTone], colorName: lightText + "красный" },
  { color: red[mediumTone], colorName: "красный" },
  { color: red[darkTone], colorName: darkText + "красный" },
  { color: pink[lightTone], colorName: lightText + "розовый" },
  { color: pink[mediumTone], colorName: "розовый" },
  { color: pink[darkTone], colorName: darkText + "розовый" },
  { color: purple[lightTone], colorName: lightText + "фиолетовый" },
  { color: purple[mediumTone], colorName: "фиолетовый" },
  { color: purple[darkTone], colorName: darkText + "фиолетовый" },
  { color: grey[lightTone], colorName: lightText + "серый" },
  { color: grey[mediumTone], colorName: "серый" },
  { color: grey[darkTone], colorName: darkText + "серый" },
];

type Props = {
  mark: Mark;
  setMark: Dispatch<SetStateAction<Mark>>;
};

export default function GridColorBlocks({ mark, setMark }: Props) {
  const renderedColorBlocks = colorBlocks.map((block) => (
    <Tooltip
      title={block.colorName}
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
        sx={[
          {
            backgroundColor: block.color,
            height: 40,
            minWidth: 50,
            borderRadius: 1,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          },
          block.color === mark.color && styleBlueBorder,
        ]}
        onClick={() => setMark({ ...mark, ...block })}
      />
    </Tooltip>
  ));

  return (
    <Grid container direction="column" gap={0.6} maxHeight={270} mb={2}>
      {renderedColorBlocks}
    </Grid>
  );
}
