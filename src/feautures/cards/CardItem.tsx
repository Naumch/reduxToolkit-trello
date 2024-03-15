import { Box, IconButton } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
  card: Card;
};

export default function CardItem({ card }: Props) {
  return (
    <Box
      key={card.id}
      sx={{
        p: 1,
        mt: 1,
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: "#fff",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {card.title}
      <IconButton>
        <EditOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}
