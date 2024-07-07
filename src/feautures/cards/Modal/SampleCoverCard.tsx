import { Box, Stack, SxProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
  sampleCover: CoverCard | null;
  setSampleCover: Dispatch<SetStateAction<CoverCard | null>>;
};

const styleSelectedBox: SxProps = {
  border: 2,
  borderColor: "primary.main",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 2,
    borderRadius: 0.5,
    borderColor: "white",
  },
};

export default function SampleCoverCard({
  sampleCover,
  setSampleCover,
}: Props) {
  const defaultColor = "#091E4224";

  const styleFirstBox: SxProps = {
    width: "50%",
    height: 74,
    borderRadius: 1,
    boxShadow: 1,
    position: "relative",
    cursor: sampleCover ? "pointer" : null,
  };

  const styleSecondBox: SxProps = {
    backgroundColor: sampleCover ? sampleCover.color : "#091E4224",
    width: "50%",
    height: 74,
    borderRadius: 1,
    boxShadow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    px: 1,
    py: 0.6,
    position: "relative",
    cursor: sampleCover ? "pointer" : null,
  };

  return (
    <Stack gap={1} direction="row" mb={1}>
      <Box
        sx={
          sampleCover?.size === "half"
            ? { ...styleFirstBox, ...styleSelectedBox }
            : { ...styleFirstBox }
        }
        onClick={() => {
          if (sampleCover) setSampleCover({ ...sampleCover, size: "half" });
        }}
      >
        <Box
          sx={{
            height: "50%",
            backgroundColor: sampleCover ? sampleCover.color : defaultColor,
            borderRadius: "4px 4px 0 0",
          }}
        />
        <Box sx={{ p: 0.6 }}>
          <Box
            sx={{
              width: "100%",
              height: 4,
              borderRadius: 1,
              backgroundColor: sampleCover ? "#8590a2" : defaultColor,
              mb: 0.5,
            }}
          />
          <Box
            sx={{
              width: "80%",
              height: 4,
              borderRadius: 1,
              backgroundColor: sampleCover ? "#8590a2" : defaultColor,
              mb: 0.7,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: 20,
                  height: 7,
                  borderRadius: 1,
                  backgroundColor: sampleCover ? "#8590a2" : defaultColor,
                }}
              />
              <Box
                sx={{
                  width: 20,
                  height: 7,
                  borderRadius: 1,
                  backgroundColor: sampleCover ? "#8590a2" : defaultColor,
                  ml: 0.5,
                }}
              />
            </Box>
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: sampleCover ? "#8590a2" : defaultColor,
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={
          sampleCover?.size === "full"
            ? { ...styleSecondBox, ...styleSelectedBox }
            : { ...styleSecondBox }
        }
        onClick={() => {
          if (sampleCover) setSampleCover({ ...sampleCover, size: "full" });
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: 4,
            borderRadius: 1,
            backgroundColor: sampleCover ? "#8590a2" : "white",
            mb: 0.5,
          }}
        />
        <Box
          sx={{
            width: "80%",
            height: 4,
            borderRadius: 1,
            backgroundColor: sampleCover ? "#8590a2" : "white",
            mb: 0.7,
          }}
        />
      </Box>
    </Stack>
  );
}
