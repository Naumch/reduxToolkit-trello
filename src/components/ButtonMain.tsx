import { Button as ButtonBase, SxProps } from "@mui/material";

type Props = {
  text?: string;
  onClick: FunctionVoid;
  sx?: SxProps;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function ButtonMain({
  text = "Сохранить",
  onClick,
  sx,
  error,
  disabled,
  fullWidth,
}: Props) {
  return (
    <ButtonBase
      variant="contained"
      size="small"
      onClick={onClick}
      sx={sx}
      color={error ? "error" : "primary"}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {text}
    </ButtonBase>
  );
}
