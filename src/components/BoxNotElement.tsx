import { Box, Typography } from "@mui/material";

type Props = {
  title: string;
};

export default function BoxNotElement({ title }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 68,
        borderRadius: 2,
        backgroundColor: "#091e420f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2">{title}</Typography>
    </Box>
  );
}
