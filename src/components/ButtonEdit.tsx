import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
  onClick: FunctionVoid;
};

export default function ButtonEdit({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <EditOutlinedIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );
}
