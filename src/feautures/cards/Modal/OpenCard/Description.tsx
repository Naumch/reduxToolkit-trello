import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Box, Typography } from "@mui/material";
import ButtonSecondary from "../../../../components/ButtonSecondary";
import { useState } from "react";

export default function Description() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <DescriptionOutlinedIcon fontSize="small" sx={{ mt: "5px" }} />
      <Box sx={{ ml: 2, maxWidth: "90%" }}>
        <Typography variant="h6">Описание</Typography>
        <ButtonSecondary
          text="Добавить более подробное описание..."
          onClick={() => setIsEditing(true)}
        />
      </Box>
    </Box>
  );
}
