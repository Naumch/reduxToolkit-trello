import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  title: string;
  onClick: () => void;
};

const ModalHeader = ({ title, onClick }: Props) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Typography align="center" variant="body1" fontWeight={500}>
        {title}
      </Typography>
      <IconButton
        onClick={onClick}
        sx={{ position: "absolute", top: -5, right: -6 }}
      >
        <CloseIcon fontSize="small" htmlColor="black" />
      </IconButton>
    </Box>
  );
};

export default ModalHeader;
