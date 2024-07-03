import { Stack } from "@mui/material";
import { useContext } from "react";
import { ContextModalCard } from "../../CardItem";
import Mark from "../../../marks/Mark";
import Label from "../../../../components/Label";

export default function Marks() {
  const { card } = useContext(ContextModalCard);

  if (!card.marks.length) {
    return null;
  }

  const renderedMarks = card.marks.map((mark) => <Mark id={mark} />);

  return (
    <>
      <Label text="Метки" />
      <Stack>{renderedMarks}</Stack>
    </>
  );
}
