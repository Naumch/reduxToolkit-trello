import { ReactNode, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { Box, Modal, Stack, Typography } from "@mui/material";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonCardAction from "./ButtonCardAction";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import CallToActionOutlinedIcon from "@mui/icons-material/CallToActionOutlined";
import { useAppDispatch } from "../../common/hooks";
import { cardUpdated } from "./cardsSlice";
import ModalWrapper from "../../components/ModalWrapper";
import ModalContent from "./Modal/ModalContent";
import StackMarks from "../marks/StackMarks";

type Props = {
  card: Card;
};

type Buttons = {
  id: string;
  text: ReactNode;
  func: () => void;
};

export default function CardItem({ card }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);
  const [typeAction, setTypeAction] = useState<CardAction>("openCard");

  const dispatch = useAppDispatch();

  const handleOpenChildModal = (type: CardAction) => {
    setTypeAction(type);
    setOpenChildModal(true);
  };

  const buttons: Buttons[] = [
    {
      id: nanoid(),
      text: (
        <>
          <CallToActionOutlinedIcon fontSize="small" />
          Открыть карточку
        </>
      ),
      func: () => handleOpenChildModal("openCard"),
    },
    {
      id: nanoid(),
      text: (
        <>
          <BookmarkBorderOutlinedIcon fontSize="small" />
          Изменить метки
        </>
      ),
      func: () => handleOpenChildModal("changeMarks"),
    },
    {
      id: nanoid(),
      text: (
        <>
          <PhotoOutlinedIcon fontSize="small" />
          Сменить обложку
        </>
      ),
      func: () => handleOpenChildModal("changeCover"),
    },
    {
      id: nanoid(),
      text: (
        <>
          <AccessTimeOutlinedIcon fontSize="small" />
          Изменить даты
        </>
      ),
      func: () => handleOpenChildModal("changeDate"),
    },
    {
      id: nanoid(),
      text: (
        <>
          <ArrowForwardOutlinedIcon fontSize="small" />
          Переместить
        </>
      ),
      func: () => handleOpenChildModal("moveCard"),
    },
    {
      id: nanoid(),
      text: (
        <>
          <ContentCopyOutlinedIcon fontSize="small" />
          Копировать
        </>
      ),
      func: () => handleOpenChildModal("copyCard"),
    },
    {
      id: nanoid(),
      text: (
        <>
          <ArchiveOutlinedIcon fontSize="small" />
          Архивировать
        </>
      ),
      func: () => {
        dispatch(cardUpdated({ id: card.id, changes: { archive: true } }));
        setOpenModal(false);
      },
    },
  ];

  const renderedButtons = buttons.map((button) => (
    <ButtonCardAction
      key={button.id}
      text={button.text}
      onClick={button.func}
    />
  ));

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenChildModal(false);
  };

  return (
    <Box
      sx={{
        p: 1,
        mt: 1,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#fff",
        cursor: "pointer",
      }}
    >
      {!!card.marks.length && <StackMarks markIds={card.marks} />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          ml={1}
          maxWidth={190}
          sx={{ overflow: "auto", textOverflow: "ellipsis" }}
          variant="body2"
        >
          {card.title}
        </Typography>
        <ButtonEdit onClick={() => setOpenModal(true)} />
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box>
            <Stack alignItems="start">{renderedButtons}</Stack>
            <ModalWrapper
              open={openChildModal}
              onClose={() => setOpenChildModal(false)}
            >
              <ModalContent
                typeAction={typeAction}
                card={card}
                handleCloseModal={handleCloseModal}
              />
            </ModalWrapper>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
