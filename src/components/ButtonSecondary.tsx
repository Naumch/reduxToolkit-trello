import { Button, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  text: ReactNode;
};

export default function ButtonSecondary({ onClick, text }: Props) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
        textTransform: "none",
        boxShadow: 0,
        fontWeight: 400,
        fontSize: 16,
        borderRadius: 1,
        whiteSpace: "nowrap",
        transition: ".3s",
        "&:hover": {
          backgroundColor: "secondary.dark",
          boxShadow: 0,
        },
      }}
      onClick={onClick}
    >
      <Typography variant="body2">{text}</Typography>
    </Button>
  );
}
