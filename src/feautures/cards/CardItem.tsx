import { Box } from "@mui/material";
import ButtonEdit from "../../components/ButtonEdit";

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
      <ButtonEdit onClick={() => console.log("test")} />
    </Box>
  );
}
