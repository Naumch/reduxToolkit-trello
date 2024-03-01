import { useState, useRef } from "react";

import { Box, Typography, TextField } from "@mui/material";
import ModalActionsWithList from "./ModalActionsWithList";

type Props = {
  list: List;
};

export default function ListItem({ list }: Props) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(list.title);
  const ref = useRef<HTMLDivElement>();

  return (
    <Box
      sx={{
        width: 272,
        padding: "8px 8px 8px 16px",
        borderRadius: 2,
        backgroundColor: "#F1F2F4",
        boxShadow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {edit ? (
        <TextField
          inputRef={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
          sx={{ backgroundColor: "white" }}
        />
      ) : (
        <Typography sx={{ cursor: "pointer" }} onClick={() => setEdit(true)}>
          {list.title}
        </Typography>
      )}
      <ModalActionsWithList id={list.id} />
    </Box>
  );
}
