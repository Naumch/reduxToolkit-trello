import { ReactNode, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { Box, Modal, Stack } from "@mui/material";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonCardAction from "./ButtonCardAction";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import CallToActionOutlinedIcon from "@mui/icons-material/CallToActionOutlined";
import { useAppDispatch } from "../../app/hooks";
import { cardUpdated } from "./cardsSlice";
import ModalWrapper from "../../components/ModalWrapper";
import ModalContent from "./Modal/ModalContent";
import SmallMark from "../marks/SmallMark";

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

  const buttons: Buttons[] = [
    {
      id: nanoid(),
      text: (
        <>
          <CallToActionOutlinedIcon fontSize="small" />
          Открыть карточку
        </>
      ),
      func: () => {
        setTypeAction("openCard");
        setOpenChildModal(true);
      },
    },
    {
      id: nanoid(),
      text: (
        <>
          <BookmarkBorderOutlinedIcon fontSize="small" />
          Изменить метки
        </>
      ),
      func: () => {
        setTypeAction("changeMarks");
        setOpenChildModal(true);
      },
    },
    {
      id: nanoid(),
      text: (
        <>
          <PhotoOutlinedIcon fontSize="small" />
          Сменить обложку
        </>
      ),
      func: () => {
        setTypeAction("changeCover");
        setOpenChildModal(true);
      },
    },
    {
      id: nanoid(),
      text: (
        <>
          <AccessTimeOutlinedIcon fontSize="small" />
          Изменить даты
        </>
      ),
      func: () => {
        setTypeAction("changeDate");
        setOpenChildModal(true);
      },
    },
    {
      id: nanoid(),
      text: (
        <>
          <ArrowForwardOutlinedIcon fontSize="small" />
          Переместить
        </>
      ),
      func: () => {
        setTypeAction("moveCard");
        setOpenChildModal(true);
      },
    },
    {
      id: nanoid(),
      text: (
        <>
          <ContentCopyOutlinedIcon fontSize="small" />
          Копировать
        </>
      ),
      func: () => {
        setTypeAction("copyCard");
        setOpenChildModal(true);
      },
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

  const renderedMarks = card.marks.map((markId) => (
    <SmallMark key={markId} id={markId} />
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
        borderRadius: 1,
        boxShadow: 1,
        backgroundColor: "#fff",
        cursor: "pointer",
      }}
    >
      <Stack direction="row" gap={1}>
        {renderedMarks}
      </Stack>
      <Box
        key={card.id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {card.title}
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
