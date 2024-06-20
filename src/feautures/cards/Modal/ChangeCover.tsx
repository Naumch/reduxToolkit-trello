import { Typography, Box, Stack, Grid } from "@mui/material";
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
import { useState } from "react";
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
  blueGrey[tone],
];

export default function ChangeCover() {
  const [cover, setCover] = useState("");

  const renderedColorBlocks = colors.map((color) => (
    <Box
      key={color}
      sx={{
        position: "relative",
        backgroundColor: color,
        height: 34,
        width: "18%",
        borderRadius: 1,
        border: color === cover ? 2 : null,
        borderColor: "primary.main",
        "&:before":
          color === cover
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
      onClick={() => setCover(color)}
    />
  ));

  return (
    <>
      <ModalHeader title="Обложка" />
      <Typography variant="body2">Размер</Typography>
      <Stack gap={1} direction="row">
        <Box sx={{ width: "50%", height: 74, borderRadius: 1, boxShadow: 1 }}>
          <Box
            sx={{
              height: "50%",
              backgroundColor: cover,
              borderRadius: "4px 4px 0 0",
            }}
          />
          <Box sx={{backgroundColor: "black"}}/>
        </Box>
        <Box
          sx={{
            backgroundColor: cover,
            width: "50%",
            height: 74,
            borderRadius: 1,
            boxShadow: 1,
          }}
        ></Box>
      </Stack>
      <Typography variant="body2">Цвета</Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.8}>
        {renderedColorBlocks}
      </Stack>
      <Typography variant="body2">Вложения</Typography>
      <Typography variant="body2">Изображения из базы Unsplash</Typography>
    </>
  );
}
