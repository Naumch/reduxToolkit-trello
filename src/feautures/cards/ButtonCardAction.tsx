import { ReactNode } from "react";
import { Button, Typography } from "@mui/material";

type Props = {
  onClick: () => void;
  text: ReactNode;
};

export default function ButtonCardAction({ onClick, text }: Props) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#f1f2f4",
        color: "secondary.contrastText",
        textTransform: "none",
        borderRadius: 1,
        transition: ".3s",
        mb: 0.5,
        py: 1,
        px: 1.5,
        "&:hover": {
          backgroundColor: "#dcdfe4",
        },
      }}
      onClick={onClick}
    >
      <Typography
        variant="body2"
        fontWeight={500}
        display="flex"
        gap={1}
        alignItems="center"
      >
        {text}
      </Typography>
    </Button>
  );
}
