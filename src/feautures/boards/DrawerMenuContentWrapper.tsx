import { Dispatch, SetStateAction, ReactNode } from "react";
import { Divider, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

type Props = {
  title: string;
  onClick: () => void;
  children?: ReactNode;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
};

export default function DrawerMenuContentWrapper({
  title,
  onClick,
  children,
  setOpenDrawer,
}: Props) {
  return (
    <Box sx={{ width: 320, px: 1 }} role="presentation">
      <Box
        sx={{
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton onClick={onClick}>
          <ChevronLeftOutlinedIcon htmlColor="black" />
        </IconButton>
        <Typography align="center" variant="h6">
          {title}
        </Typography>
        <IconButton onClick={() => setOpenDrawer(false)}>
          <CloseIcon fontSize="small" htmlColor="black" />
        </IconButton>
      </Box>
      <Divider />
      {children}
    </Box>
  );
}
