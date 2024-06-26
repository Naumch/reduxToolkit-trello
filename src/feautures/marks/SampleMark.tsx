import { Box, Tooltip, Typography } from "@mui/material";
import {
  createTooltipTextForMark,
  getContrastColorText,
} from "../../common/hooks";

type Props = {
  mark: Mark;
  onClick?: FunctionVoid;
  hoverChanges?: boolean;
};

export default function SampleMark({ mark, onClick, hoverChanges }: Props) {
  return (
    <Tooltip
      title={createTooltipTextForMark(mark)}
      disableInteractive
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -4],
              },
            },
          ],
        },
      }}
    >
      <Box
        key={mark.id}
        sx={{
          width: 268,
          height: 36,
          mb: 0.5,
          borderRadius: 1,
          backgroundColor: mark.color,
          cursor: hoverChanges ? "pointer" : "",
          display: "flex",
          alignItems: "center",
          pl: 2,
          "&:hover": {
            opacity: hoverChanges ? 0.8 : "",
          },
        }}
        onClick={onClick}
      >
        <Typography
          color={getContrastColorText(mark.color)}
          variant="body1"
          fontWeight={500}
          fontSize={14}
        >
          {mark.title}
        </Typography>
      </Box>
    </Tooltip>
  );
}
