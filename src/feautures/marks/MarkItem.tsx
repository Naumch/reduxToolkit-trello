import { Box, Tooltip, Typography } from "@mui/material";

type Props = {
  mark: Mark;
  onClick?: () => void;
  hoverChanges?: boolean;
};

export default function MarkItem({ mark, onClick, hoverChanges }: Props) {
  const tooltipText = `Цвет: ${mark.colorName}, название: "${
    mark.title ? mark.title : "без названия"
  }"`;

  return (
    <Tooltip
      title={tooltipText}
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
          backgroundColor: mark.bgColor,
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
          color={mark.fontColor}
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
