import { Box, SxProps } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
  background: string;
  onClick: FunctionVoid;
  style?: SxProps;
  withIcon: boolean;
};

export default function BoxSampleBackground({
  background,
  onClick,
  style,
  withIcon,
}: Props) {
  return (
    <Box
      sx={{
        backgroundImage: background,
        backgroundSize: "cover",
        borderRadius: 1,
        cursor: "pointer",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      onClick={onClick}
    >
      {withIcon && <DoneIcon />}
    </Box>
  );
}
