import { SxProps, Typography } from "@mui/material";

type Props = {
  text: string;
  sx?: SxProps;
};

export default function Label({ text, sx }: Props) {
  return (
    <Typography variant="caption" sx={sx} component="p">
      {text}
    </Typography>
  );
}
