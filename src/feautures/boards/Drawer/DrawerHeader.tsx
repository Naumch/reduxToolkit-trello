import { Typography, Divider, Box, IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { ReactNode } from "react";

type Props = {
  handleClickPrev: () => void;
  title: ReactNode;
};

export default function DrawerHeader({ handleClickPrev, title }: Props) {
  return (
    <>
      <Box sx={{ py: 2 }}>
        <IconButton
          sx={{ position: "absolute", top: 12 }}
          onClick={handleClickPrev}
        >
          <ArrowBackIosNewOutlinedIcon
            htmlColor="black"
            sx={{ fontSize: 16 }}
          />
        </IconButton>
        <Typography align="center" fontWeight={500}>
          {title}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}
