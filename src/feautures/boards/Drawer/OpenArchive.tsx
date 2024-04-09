import { useParams } from "react-router-dom";
import DrawerHeader from "./DrawerHeader";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  listToggleArchive,
  selectListsdByBoardIdAndArchive,
} from "../../lists/listsSlice";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import {
  cardToggleArchive,
  selectCardsdByBoardIdAndArchive,
} from "../../cards/cardsSlice";
import { useState } from "react";

type Props = {
  handleClickPrev: () => void;
};

export default function OpenArchive({ handleClickPrev }: Props) {
  const { boardId } = useParams();
  const [toggleContentArchive, setToggleContentArchive] = useState<
    "lists" | "cards"
  >("cards");

  const dispatch = useAppDispatch();

  const lists = useAppSelector((state) =>
    selectListsdByBoardIdAndArchive(state, boardId!)
  );

  const cards = useAppSelector((state) =>
    selectCardsdByBoardIdAndArchive(state, boardId!)
  );

  const renderedArchiveLists = lists.map((list) => (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
        }}
      >
        <Typography ml={1}>{list.title}</Typography>
        <Button
          onClick={() => dispatch(listToggleArchive({ listId: list.id }))}
        >
          <ReplayOutlinedIcon sx={{ mr: 1 }} />
          Вернуть на доску
        </Button>
      </Box>
      <Divider />
    </>
  ));

  const renderedArchiveCards = cards.map((card) => (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
        }}
      >
        <Typography ml={1}>{card.title}</Typography>
        <Button
          onClick={() => dispatch(cardToggleArchive({ cardId: card.id }))}
        >
          Отправить на доску
        </Button>
      </Box>
      <Divider />
    </>
  ));

  return (
    <>
      <DrawerHeader title="Архив" handleClickPrev={handleClickPrev} />
      <Box mt={2}>
        <TextField size="small" />
        <Button
          onClick={() =>
            setToggleContentArchive((prevState) =>
              prevState === "cards" ? "lists" : "cards"
            )
          }
        >
          {toggleContentArchive === "cards" ? "К спискам" : "К карточкам"}
        </Button>
      </Box>

      {toggleContentArchive === "lists" && renderedArchiveLists}
      {toggleContentArchive === "cards" && renderedArchiveCards}
    </>
  );
}
