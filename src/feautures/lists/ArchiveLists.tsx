import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  listToggleArchive,
  selectListsdByBoardIdAndArchive,
} from "../lists/listsSlice";
import { Box, Divider, Typography } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import ButtonSecondary from "../../components/ButtonSecondary";
import BoxNotElement from "../../components/BoxNotElement";

const textButton = (
  <>
    <ReplayOutlinedIcon sx={{ mr: 1, mb: "-2px", fontSize: 14 }} />
    Вернуть на доску
  </>
);

type Props = {
  filter: string;
};

export default function ArchiveLists({ filter }: Props) {
  const { boardId } = useParams();

  const dispatch = useAppDispatch();

  const allArchiveLists = useAppSelector((state) =>
    selectListsdByBoardIdAndArchive(state, boardId!)
  );

  const filterArchiveLists = allArchiveLists.filter((list) =>
    list.title.toLowerCase().includes(filter)
  );

  if (!filterArchiveLists.length) {
    return <BoxNotElement title="Нет архивных списков" />;
  }

  const renderedArchiveLists = filterArchiveLists.map((list) => (
    <Box key={list.id}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1.5,
        }}
      >
        <Typography ml={1}>{list.title}</Typography>
        <ButtonSecondary
          onClick={() => dispatch(listToggleArchive({ listId: list.id }))}
          text={textButton}
        />
      </Box>
      <Divider />
    </Box>
  ));

  return <>{renderedArchiveLists}</>;
}
