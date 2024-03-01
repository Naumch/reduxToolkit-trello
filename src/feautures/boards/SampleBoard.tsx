import { Box, Stack, SxProps } from "@mui/material";

type Props = {
  color: string;
};

const styleSampleList: SxProps = {
  backgroundColor: "#b2c2cf",
  width: "50px",
  borderRadius: 0.5,
  boxShadow: 1,
  padding: "8px 4px",
  boxSizing: "border-box",
};

export default function SampleBoard({ color }: Props) {
  return (
    <Box
      sx={{
        backgroundImage: color,
        width: 200,
        height: 100,
        borderRadius: 1,
        margin: "20px auto",
        padding: 2,
      }}
    >
      <Stack height="100%" direction="row" justifyContent="space-around">
        <Box height="100%" sx={styleSampleList}>
          <Box
            mb={0.5}
            height={4}
            width="40%"
            sx={{ backgroundColor: "#f0f3f5" }}
          />
          <Box
            width="100%"
            height={12}
            sx={{ backgroundColor: "#f0f3f5" }}
          ></Box>
        </Box>
        <Box height="75%" sx={styleSampleList}>
          <Box height={4} width="60%" sx={{ backgroundColor: "#f0f3f5" }} />
        </Box>
        <Box height="100%" sx={styleSampleList}>
          <Box height={4} width="40%" sx={{ backgroundColor: "#f0f3f5" }} />
        </Box>
      </Stack>
    </Box>
  );
}
