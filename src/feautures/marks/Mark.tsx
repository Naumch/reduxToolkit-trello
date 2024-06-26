import { Tooltip, Box } from "@mui/material";
import { createTooltipTextForMark, useAppSelector } from "../../common/hooks";
import { selectMarkById } from "./marksSlice";

type Props = {
  id: string;
};

export default function Mark({ id }: Props) {
  const mark = useAppSelector((state) => selectMarkById(state, id));

  return (
    <Tooltip title={createTooltipTextForMark(mark)} disableInteractive>
      <Box
        sx={{
          width: 44,
          height: 8,
          backgroundColor: mark.color,
          borderRadius: 1,
          "&:hover": {
            opacity: 0.7,
          },
        }}
      />
    </Tooltip>
  );
}
