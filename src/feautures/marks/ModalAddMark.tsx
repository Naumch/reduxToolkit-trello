import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../app/hooks";
import { markAdded, markDeleted, markUpdated } from "./marksSlice";

import MarkItem from "./MarkItem";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import GridColorBlocks from "./GridColorBlocks";

type Props = {
  mark: Mark;
  setMark: Dispatch<SetStateAction<Mark>>;
  handleCloseModal: () => void;
  isCreatingNewMark: boolean;
};

export default function ModalAddMark({
  mark,
  setMark,
  handleCloseModal,
  isCreatingNewMark,
}: Props) {
  const dispatch = useAppDispatch();

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
        <MarkItem mark={mark} />
      </Box>
      <Typography my={1} variant="body2">
        Название
      </Typography>
      <TextField
        size="small"
        value={mark.title}
        onChange={(e) => setMark({ ...mark, title: e.target.value })}
        fullWidth
      />
      <Typography mt={2} mb={1} variant="body2">
        Цвет
      </Typography>
      <GridColorBlocks mark={mark} setMark={setMark} />
      <Divider />
      {isCreatingNewMark ? (
        <Button
          onClick={() => {
            dispatch(markAdded(mark));
            handleCloseModal();
          }}
          sx={{ mt: 2 }}
          variant="contained"
          size="small"
        >
          Создание
        </Button>
      ) : (
        <Stack mt={2} justifyContent="space-between" direction="row">
          <Button
            onClick={() => {
              dispatch(markUpdated(mark));
              handleCloseModal();
            }}
            size="small"
            variant="contained"
          >
            Сохранить
          </Button>
          <Button
            onClick={() => {
              dispatch(markDeleted(mark.id));
              handleCloseModal();
            }}
            color="error"
            size="small"
            variant="contained"
          >
            Удалить
          </Button>
        </Stack>
      )}
    </>
  );
}
