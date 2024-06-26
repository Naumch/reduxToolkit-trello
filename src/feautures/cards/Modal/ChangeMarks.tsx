import { useParams } from "react-router-dom";
import ModalHeader from "../../../components/ModalHeader";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { selectMarksdByBoardId } from "../../marks/marksSlice";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import SampleMark from "../../marks/SampleMark";
import { cardChangedMark } from "../cardsSlice";
import ButtonEdit from "../../../components/ButtonEdit";
import ModalWorkWithMarks from "../../marks/ModalWorkWithMarks";
import { nanoid } from "@reduxjs/toolkit";
import { green } from "@mui/material/colors";
import ButtonSecondary from "../../../components/ButtonSecondary";

type Props = {
  card: Card;
};

export default function ChangeMarks({ card }: Props) {
  const { boardId } = useParams();
  const marks = useAppSelector(selectMarksdByBoardId(boardId!));

  const newMark: Mark = {
    id: nanoid(),
    title: "",
    board: boardId!,
    bgColor: green[400],
    fontColor: "black",
    colorName: "зеленый",
  };

  const [editableMark, setEditableMark] = useState<Mark>(newMark);
  const [isEditingMarks, setIsEditingMarks] = useState(false);
  const [isCreatingNewMark, setIsCreatingNewMark] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(cardChangedMark({ cardId: card.id, markId: e.target.name }));
  };

  if (isEditingMarks) {
    return (
      <>
        <ModalHeader
          title={isCreatingNewMark ? "Создание метки" : "Изменение метки"}
          handleClickPrev={() => {
            setIsEditingMarks(false);
            setIsCreatingNewMark(false);
            setEditableMark(newMark);
          }}
        />
        <ModalWorkWithMarks
          mark={editableMark}
          setMark={setEditableMark}
          handleCloseModal={() => {
            setIsEditingMarks(false);
            setIsCreatingNewMark(false);
            setEditableMark(newMark);
          }}
          isCreatingNewMark={isCreatingNewMark}
        />
      </>
    );
  }

  const renderedMarks = marks.map((mark) => (
    <Stack direction="row" alignItems="center">
      <FormControlLabel
        key={mark.id}
        control={
          <Checkbox
            checked={card.marks.includes(mark.id)}
            onChange={handleChange}
            name={mark.id}
            size="small"
          />
        }
        label={<SampleMark mark={mark} />}
      />
      <ButtonEdit
        onClick={() => {
          setEditableMark(mark);
          setIsEditingMarks(true);
        }}
      />
    </Stack>
  ));

  return (
    <>
      <ModalHeader title="Метки" />
      <FormControl component="fieldset">
        <FormGroup>{renderedMarks}</FormGroup>
      </FormControl>
      <ButtonSecondary
        text="Создать новую метку"
        onClick={() => {
          setIsCreatingNewMark(true);
          setIsEditingMarks(true);
        }}
        fullWidth
      />
    </>
  );
}
