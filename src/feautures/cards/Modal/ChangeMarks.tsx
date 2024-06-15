import { useParams } from "react-router-dom";
import ModalHeader from "../../../components/ModalHeader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectMarksdByBoardId } from "../../marks/marksSlice";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ChangeEvent } from "react";
import MarkItem from "../../marks/MarkItem";
import { cardChangedMark } from "../cardsSlice";

type Props = {
  card: Card;
};

export default function ChangeMarks({ card }: Props) {
  const { boardId } = useParams();
  const marks = useAppSelector(selectMarksdByBoardId(boardId!));

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(cardChangedMark({ cardId: card.id, markId: e.target.name }));
  };

  const renderedMarks = marks.map((mark) => (
    <FormControlLabel
      key={mark.id}
      control={
        <Checkbox
          checked={card.marks.includes(mark.id)}
          onChange={handleChange}
          name={mark.id}
        />
      }
      label={<MarkItem mark={mark} />}
    />
  ));

  return (
    <>
      <ModalHeader title="Метки" />
      <FormControl component="fieldset">
        <FormGroup>{renderedMarks}</FormGroup>
      </FormControl>
    </>
  );
}
