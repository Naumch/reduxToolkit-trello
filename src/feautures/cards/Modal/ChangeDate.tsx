import ModalHeader from "../../../components/ModalHeader";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useContext, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { numberMillisecondsInDay, useAppDispatch } from "../../../common/hooks";
import { ContextModalCard } from "../CardItem";
import ButtonMain from "../../../components/ButtonMain";
import ButtonSecondary from "../../../components/ButtonSecondary";
import { cardUpdated } from "../cardsSlice";

export default function ChangeDate() {
  const { card } = useContext(ContextModalCard);
  const [value, setValue] = useState<Dayjs>(
    dayjs(Date.now() + numberMillisecondsInDay)
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <ModalHeader title="Даты" />
      <DateCalendar
        value={value}
        onChange={(newValue) => setValue(newValue)}
        sx={{
          "& .Mui-selected": {
            backgroundColor: "primary.main !important",
            color: "white",
          },
        }}
      />
      <ButtonMain
        onClick={() => {
          dispatch(
            cardUpdated({ id: card.id, changes: { deadline: value.unix() } })
          );
        }}
        fullWidth
        sx={{ mb: 1 }}
      />
      <ButtonSecondary onClick={() => {}} text="Удалить" fullWidth />
    </>
  );
}
