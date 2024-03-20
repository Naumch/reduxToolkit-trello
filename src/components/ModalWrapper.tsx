import { ReactNode } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export default function ModalWrapper({
  title,
  children,
  open,
  onClose,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -25%)",
          width: 344,
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Typography align="center" variant="body1" fontWeight={500}>
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: -5, right: -6 }}
          >
            <CloseIcon fontSize="small" htmlColor="black" />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
}
