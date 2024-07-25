import ModalHeader from "../../../components/ModalHeader";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function ChangeDate() {
  const [value, setValue] = useState<Dayjs | null>(dayjs(Date.now()));

  return (
    <>
      <ModalHeader title="Даты" />
      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
    </>
  );
}
