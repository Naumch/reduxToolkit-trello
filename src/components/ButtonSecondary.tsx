import { ReactNode } from "react";
import { Button, SxProps, Typography } from "@mui/material";

type Props = {
  onClick: FunctionVoid;
  text: ReactNode;
  fullWidth?: boolean;
  sx?: SxProps;
};

export default function ButtonSecondary({
  onClick,
  text,
  fullWidth,
  sx,
}: Props) {
  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
        textTransform: "none",
        boxShadow: 0,
        fontWeight: 400,
        fontSize: 16,
        borderRadius: 1,
        transition: ".3s",
        "&:hover": {
          backgroundColor: "secondary.dark",
          boxShadow: 0,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <Typography variant="body2">{text}</Typography>
    </Button>
  );
}
