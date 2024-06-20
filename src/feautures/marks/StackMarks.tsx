import { Stack } from "@mui/material";
import Mark from "./Mark";

type Props = {
  markIds: string[];
};

export default function StackMarks({ markIds }: Props) {
  const renderedMarks = markIds.map((markId) => (
    <Mark key={markId} id={markId} />
  ));

  return (
    <Stack direction="row" gap={0.5} flexWrap="wrap" mb={1}>
      {renderedMarks}
    </Stack>
  );
}
