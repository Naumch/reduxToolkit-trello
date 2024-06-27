import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { ContextModalCard } from "../../CardItem";
import Mark from "../../../marks/Mark";

export default function Marks() {
  const { card } = useContext(ContextModalCard);

  if (!card.marks.length) {
    return null;
  }

  const renderedMarks = card.marks.map((mark) => <Mark id={mark} />);

  return (
    <>
      <Typography variant="body2">Метки</Typography>
      <Stack>{renderedMarks}</Stack>
    </>
  );
}
