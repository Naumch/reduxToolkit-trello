import { Box, Button, TextField, Tooltip } from "@mui/material";

import ModalWrapper from "../../components/ModalWrapper";
import { useState } from "react";

type Props = {
  mark: Mark;
  handleClose: () => void;
  open: boolean;
};

export default function ModalAddMark({ mark, handleClose, open }: Props) {
  const [title, setTitle] = useState(mark.title);

  const string = `Цвет: ${mark.colorName}, название: "${title}"`;

  return (
    <ModalWrapper title="Метки" open={open} onClose={handleClose}>
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
        <Tooltip title={string}>
          <Box
            sx={{
              backgroundColor: mark.color,
              width: 268,
              height: 36,
              borderRadius: 1,
            }}
          >
            {title}
          </Box>
        </Tooltip>
      </Box>
      <TextField
        size="small"
        margin="dense"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label="Название"
      />
      <Button
        onClick={() => {
          handleClose();
          setTitle("");
        }}
        size="small"
        variant="contained"
      >
        Сохранить
      </Button>
    </ModalWrapper>
  );
}
