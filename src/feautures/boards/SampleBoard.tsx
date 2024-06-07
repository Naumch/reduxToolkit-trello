import { Box } from "@mui/material";
import SampleBoardSvg from "../../images/SampleBoardSvg";

type Props = {
  background: string;
};

export default function SampleBoard({ background }: Props) {
  return (
    <Box
      sx={{
        backgroundImage: background,
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
