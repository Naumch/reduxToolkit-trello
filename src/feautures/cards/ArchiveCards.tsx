import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  cardDeleted,
  cardUpdated,
  selectCardsdByBoardIdAndArchive,
} from "../cards/cardsSlice";

import { Box, Button, Tooltip, Typography } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

import ModalWrapper from "../../components/ModalWrapper";
import BoxNotElement from "../../components/BoxNotElement";
import ButtonLink from "../../components/ButtonLink";

type Props = {
  filter: string;
};

export default function ArchiveCards({ filter }: Props) {
  const { boardId } = useParams();
  const [isDeletingCard, setIsDeletingCard] = useState(false);

  const dispatch = useAppDispatch();

  const allArchiveCards = useAppSelector(
    selectCardsdByBoardIdAndArchive(boardId!)
  );

  const filterArchiveCards = allArchiveCards.filter((card) =>
    card.title.toLowerCase().includes(filter)
  );

  if (!filterArchiveCards.length) {
    return <BoxNotElement title="Нет архивных карточек" />;
  }

  const renderedArchiveCards = filterArchiveCards.map((card) => (
    <Box key={card.id} mb={2}>
      <Box
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          mx: 1,
          py: 1,
          px: 2,
          cursor: "pointer",
          "&:hover": {
            border: 2,
            borderColor: "primary.main",
            my: "-2px",
            ml: "6px",
          },
        }}
      >
        <Typography>{card.title}</Typography>
        <Tooltip title="Архивная карточка" disableInteractive>
          <Typography
            fontSize={12}
            color="#44546f"
            sx={{ display: "flex", gap: 0.5, alignItems: "center", mt: 1 }}
          >
            <ArchiveOutlinedIcon fontSize="small" />
            Архивная
          </Typography>
        </Tooltip>
      </Box>
      <Box ml={3} display="flex" gap={1} mt={0.2}>
        <ButtonLink
          onClick={() => {
            dispatch(cardUpdated({ id: card.id, changes: { archive: false } }));
          }}
          text="Отправить на доску"
        />
        <ButtonLink onClick={() => setIsDeletingCard(true)} text="Удалить" />
      </Box>
      <ModalWrapper
        open={isDeletingCard}
        onClose={() => setIsDeletingCard(false)}
        title="Удалить карточку?"
      >
        <Typography textAlign="center" my={2}>
          Все действия будут удалены из ленты, и вы не сможете повторно открыть
          карточку. Отмена невозможна.
        </Typography>
        <Button
          color="error"
          fullWidth
          variant="contained"
          onClick={() => {
            dispatch(cardDeleted(card.id));
            setIsDeletingCard(false);
          }}
        >
          Удалить
        </Button>
      </ModalWrapper>
    </Box>
  ));

  return <>{renderedArchiveCards}</>;
}
