import { Typography, Divider, Box, IconButton } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

type Props = {
  handleClickPrev: () => void;
  title: string;
};

export default function DrawerHeader({ handleClickPrev, title }: Props) {
  return (
    <>
      <Box sx={{ py: 2 }}>
        <IconButton
          sx={{ position: "absolute", top: 12 }}
          onClick={handleClickPrev}
        >
          <ChevronLeftOutlinedIcon htmlColor="black" />
        </IconButton>
        <Typography align="center" variant="h6">
          {title}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}
