import { Box, Tooltip, Typography } from "@mui/material";

type Props = {
  mark: Mark;
  onClick?: () => void;
};

export default function MarkItem({ mark, onClick }: Props) {
  const tooltipText = `Цвет: ${mark.colorName}, название: "${
    mark.title ? mark.title : "без названия"
  }"`;

  return (
    <Tooltip title={tooltipText}>
      <Box
        key={mark.id}
        sx={{
          width: 268,
          height: 36,
          mb: 0.5,
          borderRadius: 1,
          backgroundColor: mark.bgColor,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          pl: 2,
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
