import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ButtonSecondary from "../../../components/ButtonSecondary";
import DrawerHeader from "./DrawerHeader";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { boardUpdated, selectBoardById } from "../boardsSlice";
import ButtonMain from "../../../components/ButtonMain";

type Props = {
  handleClickPrev: FunctionVoid;
};

export default function EditDescription({ handleClickPrev }: Props) {
  const { boardId } = useParams();
  const board = useAppSelector((state) => selectBoardById(state, boardId!));

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(board.description);

  const dispatch = useAppDispatch();

  const content = board.description ? (
    <Typography sx={{ m: 1 }}>{board.description}</Typography>
  ) : (
    <ButtonSecondary
      text="Расскажите участникам команды, для чего используется эта доска. Будет
      еще лучше, если вы добавите инструкции по совместной работе."
      onClick={() => setIsEditing(true)}
      sx={{ mt: 1 }}
    />
  );

  return (
    <>
      <DrawerHeader title="О доске" handleClickPrev={handleClickPrev} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography fontWeight={500}>
          <DescriptionOutlinedIcon sx={{ mr: 0.5, mb: "-3px", fontSize: 20 }} />
          Описание
        </Typography>
        {board.description && (
          <ButtonSecondary text="Изменить" onClick={() => setIsEditing(true)} />
        )}
      </Box>
      {isEditing ? (
        <>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            multiline
            rows={8}
            fullWidth
            margin="normal"
          />
          <ButtonMain
            onClick={() => {
              dispatch(
                boardUpdated({ id: board.id, changes: { description } })
              );
              setIsEditing(false);
            }}
          />
        </>
      ) : (
        content
      )}
    </>
  );
}
