import { Box, Typography } from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useState } from "react";
import ButtonSecondary from "../../../components/ButtonSecondary";

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
      <ButtonSecondary
        text="Расскажите участникам команды, для чего используется эта доска. Будет
          еще лучше, если вы добавите инструкции по совместной работе."
        onClick={() => setIsEditing(true)}
      />
    </>
  );
}
