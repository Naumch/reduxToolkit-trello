import { Box } from "@mui/material";
import SampleBoardSvg from "../../images/SampleBoardSvg";

type Props = {
  color: string;
};

export default function SampleBoard({ color }: Props) {
  return (
    <Box
      sx={{
        backgroundImage: color,
        borderRadius: 1,
        margin: "20px auto",
        textAlign: "center",
        padding: 2,
        width: "80%",
      }}
    >
      <SampleBoardSvg />
    </Box>
  );
}
