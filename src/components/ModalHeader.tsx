import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

type Props = {
  handleClickPrev?: () => void;
  title: string;
};

export default function ModalHeader({ handleClickPrev, title }: Props) {
  return (
    <>
      {handleClickPrev && (
        <IconButton
          sx={{ position: "absolute", top: -4, left: -6, fontSize: 16 }}
          onClick={handleClickPrev}
        >
          <ArrowBackIosNewOutlinedIcon fontSize="inherit" htmlColor="black" />
        </IconButton>
      )}

      <Typography
        align="center"
        fontWeight={500}
        sx={{ maxWidth: 220, margin: "auto" }}
      >
        {title}
      </Typography>
    </>
  );
}
