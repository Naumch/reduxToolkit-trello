import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
  onClick: () => void;
};

export default function ButtonEdit({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <EditOutlinedIcon fontSize="small" />
    </IconButton>
  );
}
