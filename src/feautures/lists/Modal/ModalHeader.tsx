import { Typography, Box, IconButton } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

type Props = {
  handleClickPrev: () => void;
  title: string;
};

export default function ModalHeader({ handleClickPrev, title }: Props) {
  return (
    <Box>
      <IconButton
        sx={{ position: "absolute", top: -7 }}
        onClick={handleClickPrev}
      >
        <ChevronLeftOutlinedIcon htmlColor="black" />
      </IconButton>
      <Typography align="center" fontWeight={500}>
        {title}
      </Typography>
    </Box>
  );
}
