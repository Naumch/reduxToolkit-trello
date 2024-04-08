import { Dispatch, SetStateAction, useState } from "react";
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
  IconButton,
} from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
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
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  if (isDeleting) {
    return (
      <Box>
        <IconButton
          sx={{ position: "absolute", top: 8, left: 8 }}
          onClick={() => setIsDeleting(false)}
        >
          <ChevronLeftOutlinedIcon htmlColor="black" />
        </IconButton>
        <Typography textAlign="center" my={2}>
          Метка будет удалена со всех карточек. Это действие нельзя отменить.
        </Typography>
        <Button
          color="error"
          fullWidth
          variant="contained"
          onClick={() => {
            dispatch(markDeleted(mark.id));
            handleCloseModal();
          }}
        >
          Удалить
        </Button>
      </Box>
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
            onClick={() => setIsDeleting(true)}
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
