import { IconButton, SxProps } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
  onClick: FunctionVoid;
  sx?: SxProps;
};

export default function ButtonEdit({ onClick, sx }: Props) {
  return (
    <IconButton onClick={onClick} sx={sx}>
      <EditOutlinedIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );
}
