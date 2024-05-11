import { Typography } from "@mui/material";
import ModalHeader from "../../../components/ModalHeader";

export default function MoveCard() {
  return (
    <>
      <ModalHeader title="Перемещение карточки" />
      <Typography variant="body2" mt={2} mb={1}>
        Выберете колонку
      </Typography>
    </>
  );
}
