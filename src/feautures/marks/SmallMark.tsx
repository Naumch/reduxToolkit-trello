import { Tooltip, Box } from "@mui/material";
import { createTooltipTextForMark, useAppSelector } from "../../app/hooks";
import { selectMarkById } from "./marksSlice";

type Props = {
  id: string;
};

export default function SmallMark({ id }: Props) {
  const mark = useAppSelector((state) => selectMarkById(state, id));

  return (
    <Tooltip title={createTooltipTextForMark(mark)} disableInteractive>
      <Box
        sx={{
          width: 40,
          height: 8,
          backgroundColor: mark.bgColor,
          borderRadius: 1,
          "&:hover": {
            opacity: 0.7,
          },
        }}
      ></Box>
    </Tooltip>
  );
}
