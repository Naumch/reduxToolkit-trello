import { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../common/hooks";
import { markAdded, markDeleted, markUpdated } from "./marksSlice";

import SampleMark from "./SampleMark";
import { Box, TextField, Typography, Divider, Stack } from "@mui/material";
import GridColorBlocks from "./GridColorBlocks";
import ModalContentDelete from "../../components/ModalContentDelete";
import ModalHeader from "../../components/ModalHeader";
import ButtonMain from "../../components/ButtonMain";

type Props = {
  mark: Mark;
  setMark: Dispatch<SetStateAction<Mark>>;
  handleCloseModal: FunctionVoid;
  isCreatingNewMark: boolean;
};

export default function ModalWorkWithMark({
  mark,
  setMark,
  handleCloseModal,
  isCreatingNewMark,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  if (isDeleting) {
    return (
      <>
        <ModalHeader
          title="Удалить метку?"
          handleClickPrev={() => setIsDeleting(false)}
        />
        <ModalContentDelete
          text="Метка будет удалена со всех карточек. Это действие нельзя отменить."
          onClick={() => {
            dispatch(markDeleted(mark.id));
            handleCloseModal();
          }}
        />
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#F7F8F9",
          height: 100,
          my: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SampleMark mark={mark} />
      </Box>
      <Typography variant="body2" my={1}>
        Название
      </Typography>
      <TextField
        size="small"
        value={mark.title}
        onChange={(e) => setMark({ ...mark, title: e.target.value })}
        fullWidth
        autoFocus
      />
      <Typography variant="body2" mt={2} mb={1}>
        Цвет
      </Typography>
      <GridColorBlocks mark={mark} setMark={setMark} />
      <Divider />
      {isCreatingNewMark ? (
        <ButtonMain
          text="Создание"
          onClick={() => {
            dispatch(markAdded(mark));
            handleCloseModal();
          }}
          sx={{ mt: 2 }}
        />
      ) : (
        <Stack mt={2} justifyContent="space-between" direction="row">
          <ButtonMain
            onClick={() => {
              dispatch(markUpdated(mark));
              handleCloseModal();
            }}
            text="Сохранить"
          />
          <ButtonMain
            onClick={() => setIsDeleting(true)}
            text="Удалить"
            error
          />
        </Stack>
      )}
    </>
  );
}
