import { Box, Typography } from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useState } from "react";

type Props = {
  handleClickPrev: () => void;
};

export default function EditDescription({ handleClickPrev }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <DrawerHeader title="О доске" handleClickPrev={handleClickPrev} />
      <Typography mt={2} fontWeight={500}>
        <DescriptionOutlinedIcon sx={{ mr: 0.5, mb: "-3px", fontSize: 20 }} />
        Описание
      </Typography>
      <Box
        sx={{
          backgroundColor: "secondary.main",
          p: 1,
          mt: 1,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
        onClick={() => setIsEditing(true)}
      >
        <Typography variant="body2">
          Расскажите участникам команды, для чего используется эта доска. Будет
          еще лучше, если вы добавите инструкции по совместной работе.
        </Typography>
      </Box>
    </>
  );
}
