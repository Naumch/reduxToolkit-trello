import { Box } from "@mui/material";
import SampleBoardSvg from "../../images/SampleBoardSvg";

type Props = {
  background: string | PhotoUnsplash;
};

export default function SampleBoard({ background }: Props) {
  return (
    <Box
      sx={{
        backgroundImage:
          typeof background === "object"
            ? `url(${background.urls.thumb})`
            : background,
        backgroundSize: "cover",
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
