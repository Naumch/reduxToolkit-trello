import { Typography, Button, Box } from "@mui/material";

type Props = {
  text: string;
  onClick: FunctionVoid;
  textButton?: string;
};

export default function ModalContentDelete({
  text,
  onClick,
  textButton,
}: Props) {
  return (
    <Box>
      <Typography textAlign="center" my={2}>
        {text}
      </Typography>
      <Button color="error" fullWidth variant="contained" onClick={onClick}>
        {textButton ? textButton : "Удалить"}
      </Button>
    </Box>
  );
}
