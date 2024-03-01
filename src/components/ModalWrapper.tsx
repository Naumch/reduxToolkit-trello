import { ReactNode } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export default function ModalWrapper({ children, open, onClose }: Props) {
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
        {children}
      </Box>
    </Modal>
  );
}
