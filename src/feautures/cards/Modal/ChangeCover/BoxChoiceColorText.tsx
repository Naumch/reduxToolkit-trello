import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { ContextModalCard } from "../../CardItem";
import { styleBlueBorder } from "../../../../common/hooks";

type Props = {
  colorText: "white" | "black";
  selected: boolean | null;
  onClick: FunctionVoid;
};

export default function BoxChoiceColorText({
  colorText,
  selected,
  onClick,
}: Props) {
  const { card } = useContext(ContextModalCard);

  const gradient =
    colorText === "white"
      ? "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))"
      : "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))";

  const backgroundImage = `${gradient}, url(${
    "url" in card.cover! && card.cover.url
  })`;

  return (
    <Box
      sx={[
        {
          width: "50%",
          height: 34,
          borderRadius: 1,
          boxShadow: 1,
          cursor: "pointer",
          backgroundImage,
          backgroundPosition: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          display: "flex",
          alignItems: "center",
          px: 1,
        },
        selected && styleBlueBorder,
      ]}
      onClick={onClick}
    >
      <Typography color={colorText} fontWeight={600} fontSize={14}>
        {card.title}
      </Typography>
    </Box>
  );
}
