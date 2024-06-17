import { Stack } from "@mui/material";
import SmallMark from "./SmallMark";

type Props = {
  markIds: string[];
};

export default function StackMarksOnTheCard({ markIds }: Props) {
  const renderedMarks = markIds.map((markId) => (
    <SmallMark key={markId} id={markId} />
  ));

  return (
    <Stack direction="row" gap={0.5} flexWrap="wrap">
      {renderedMarks}
    </Stack>
  );
}
