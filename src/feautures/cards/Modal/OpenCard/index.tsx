import { Box } from "@mui/material";
import Header from "./Header";
import Marks from "./Marks";
import Description from "./Description";

export default function OpenCard() {
  return (
    <Box>
      <Header />
      <Marks />
      <Description />
    </Box>
  );
}
