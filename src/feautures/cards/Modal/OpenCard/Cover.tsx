import { Box } from "@mui/material";
import { useContext } from "react";
import { ContextModalCard } from "../../CardItem";

export default function Cover() {
  const { card } = useContext(ContextModalCard);

  return (
    <>
      {card.cover && "color" in card.cover ? (
        <Box
          sx={{
            height: 120,
            backgroundColor: card.cover.color,
          }}
        />
      ) : (
        <Box />
      )}
    </>
  );
}
