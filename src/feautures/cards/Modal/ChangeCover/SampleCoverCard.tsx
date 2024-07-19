import { Box, Stack, SxProps } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { styleBlueBorder } from "../../../../common/hooks";

type Props = {
  size: "half" | "full" | null;
  setSize: Dispatch<SetStateAction<"half" | "full" | null>>;
  color: string | null;
  url: string | null;
};

export default function SampleCoverCard({ size, setSize, color, url }: Props) {
  const defaultColor = "#091E4224";

  const styleBox: SxProps = {
    width: "50%",
    height: 74,
    borderRadius: 1,
    boxShadow: 1,
    cursor: color || url ? "pointer" : null,
  };

  const styleSecondBox: SxProps = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    px: 1,
    py: 0.6,
  };

  return (
    <Stack gap={1} direction="row" mb={1}>
      <Box
        sx={[styleBox, size === "half" ? styleBlueBorder : null]}
        onClick={() => {
          if (url || color) setSize("half");
        }}
      >
        <Box
          sx={[
            {
              height: "50%",
              borderRadius: "4px 4px 0 0",
              backgroundColor: defaultColor,
            },
            url ? { backgroundImage: `url(${url})` } : null,
            color ? { backgroundColor: color } : null,
          ]}
        />
        <Box sx={{ p: 0.6 }}>
          <Box
            sx={{
              width: "100%",
              height: 4,
              borderRadius: 1,
              backgroundColor: url || color ? "#8590a2" : defaultColor,
              mb: 0.5,
            }}
          />
          <Box
            sx={{
              width: "80%",
              height: 4,
              borderRadius: 1,
              backgroundColor: url || color ? "#8590a2" : defaultColor,
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
                  backgroundColor: url || color ? "#8590a2" : defaultColor,
                }}
              />
              <Box
                sx={{
                  width: 20,
                  height: 7,
                  borderRadius: 1,
                  backgroundColor: url || color ? "#8590a2" : defaultColor,
                  ml: 0.5,
                }}
              />
            </Box>
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                backgroundColor: url || color ? "#8590a2" : defaultColor,
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={[
          styleBox,
          styleSecondBox,
          color ? { backgroundColor: color } : { backgroundColor: "#091E4224" },
          url ? { backgroundImage: `url(${url})` } : null,
          size === "full" && styleBlueBorder,
        ]}
        onClick={() => {
          if (color || url) setSize("full");
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: 4,
            borderRadius: 1,
            backgroundColor: color || url ? "#8590a2" : "white",
            mb: 0.5,
          }}
        />
        <Box
          sx={{
            width: "80%",
            height: 4,
            borderRadius: 1,
            backgroundColor: color || url ? "#8590a2" : "white",
            mb: 0.7,
          }}
        />
      </Box>
    </Stack>
  );
}
