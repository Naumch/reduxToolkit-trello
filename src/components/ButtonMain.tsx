import { Button as ButtonBase, SxProps } from "@mui/material";

type Props = {
  text: string;
  onClick: FunctionVoid;
  sx?: SxProps;
  error?: boolean;
  disabled?: boolean;
};

export default function ButtonMain({
  text,
  onClick,
  sx,
  error,
  disabled,
}: Props) {
  return (
    <ButtonBase
      variant="contained"
      size="small"
      onClick={onClick}
      sx={sx}
      color={error ? "error" : "primary"}
      disabled={disabled}
    >
      {text}
    </ButtonBase>
  );
}
