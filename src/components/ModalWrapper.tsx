import { ReactNode } from "react";

import { Modal, Box, IconButton, SxProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  onClose: FunctionVoid;
  children: ReactNode;
  sx?: SxProps;
};

export default function ModalWrapper({ open, onClose, children, sx }: Props) {
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
          ...sx,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {children}
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: -5, right: -6 }}
          >
            <CloseIcon fontSize="small" htmlColor="black" />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
