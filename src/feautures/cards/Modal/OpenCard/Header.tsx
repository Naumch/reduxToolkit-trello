import { Box, Typography } from "@mui/material";
import CallToActionOutlinedIcon from "@mui/icons-material/CallToActionOutlined";
import { useAppSelector } from "../../../../common/hooks";
import { selectListById } from "../../../lists/listsSlice";
import { useContext } from "react";
import { ContextModalCard } from "../../CardItem";

export default function Header() {
  const { card } = useContext(ContextModalCard);
  const list = useAppSelector((state) => selectListById(state, card.list));

  return (
    <Box sx={{ display: "flex" }}>
      <CallToActionOutlinedIcon fontSize="small" sx={{ mt: "5px" }} />
      <Box sx={{ ml: 2, maxWidth: "90%" }}>
        <Typography variant="h6">{card.title}</Typography>
        <Typography>в колонке {list.title}</Typography>
      </Box>
    </Box>
  );
}
