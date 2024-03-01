import { Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

type Props = {
  title: string;
};

export default function BoardsListTitle({ title }: Props) {
  return (
    <Typography
      variant="h4"
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <PersonOutlineIcon fontSize="large" />
      {title}
    </Typography>
  );
}
