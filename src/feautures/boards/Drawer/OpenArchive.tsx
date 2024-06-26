import { useState } from "react";

import { Box, TextField } from "@mui/material";
import DrawerHeader from "./DrawerHeader";
import ButtonSecondary from "../../../components/ButtonSecondary";
import ArchiveLists from "../../lists/ArchiveLists";
import ArchiveCards from "../../cards/ArchiveCards";

type Props = {
  handleClickPrev: FunctionVoid;
};

export default function OpenArchive({ handleClickPrev }: Props) {
  const [value, setValue] = useState("");
  const [toggleContentArchive, setToggleContentArchive] = useState<
    "lists" | "cards"
  >("cards");

  return (
    <>
      <DrawerHeader title="Архив" handleClickPrev={handleClickPrev} />
      <Box my={2} display="flex" gap={1}>
        <TextField
          size="small"
          sx={{ minWidth: "60%" }}
          placeholder="Поиск в архиве..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ButtonSecondary
          sx={{ whiteSpace: "nowrap" }}
          onClick={() =>
            setToggleContentArchive((prevState) =>
              prevState === "cards" ? "lists" : "cards"
            )
          }
          text={toggleContentArchive === "cards" ? "К спискам" : "К карточкам"}
        />
      </Box>
      {toggleContentArchive === "lists" && (
        <ArchiveLists filter={value.toLowerCase()} />
      )}
      {toggleContentArchive === "cards" && (
        <ArchiveCards filter={value.toLowerCase()} />
      )}
    </>
  );
}
