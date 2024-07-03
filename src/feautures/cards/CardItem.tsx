import { ReactNode, useState, createContext, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";

import { Box, Modal, Stack, TextField, Typography } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ButtonEdit from "../../components/ButtonEdit";
import ButtonCardAction from "./ButtonCardAction";

import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import CallToActionOutlinedIcon from "@mui/icons-material/CallToActionOutlined";
import { pressedEnter, useAppDispatch } from "../../common/hooks";
import { cardUpdated } from "./cardsSlice";
import ModalWrapper from "../../components/ModalWrapper";
import ModalContent from "./Modal/ModalContent";
import StackMarks from "../marks/StackMarks";
import ButtonMain from "../../components/ButtonMain";

type Props = {
  card: Card;
};

type Buttons = {
  id: string;
  text: ReactNode;
  func: FunctionVoid;
};

interface IContextModalCard {
  card: Card;
  handleCloseModal: FunctionVoid;
}

export const ContextModalCard = createContext<IContextModalCard>({
  card: {
    id: "",
    title: "",
    list: "",
    archive: false,
    time: "",
    marks: [],
    cover: false,
  },
  handleCloseModal: () => {},
});

export default function CardItem({ card }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);
  const [typeAction, setTypeAction] = useState<CardAction>("openCard");
  const [title, setTitle] = useState(card.title);

  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleOpenChildModal = (type: CardAction) => {
    setTypeAction(type);
    setOpenChildModal(true);
  };

  const updateTitle = () => {
    if (title.trim()) {
      dispatch(cardUpdated({ id: card.id, changes: { title } }));
      setOpenModal(false);
    }
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

  const valueContext: IContextModalCard = { card, handleCloseModal };

  return (
    <Box
      ref={ref}
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
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: ref.current?.getBoundingClientRect().y,
                left: ref.current?.getBoundingClientRect().x,
              }}
            >
              <Stack direction="row">
                <Box>
                  <Box
                    sx={{
                      width: 256,
                      height: ref.current?.offsetHeight,
                      mr: 1,
                      mb: 1,
                      borderRadius: 2,
                      backgroundColor: "white",
                    }}
                  >
                    <TextField
                      fullWidth
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(event) => pressedEnter(event, updateTitle)}
                      multiline
                      size="small"
                      autoFocus
                    />
                  </Box>
                  <ButtonMain onClick={updateTitle} />
                </Box>
                <Stack alignItems="start">{renderedButtons}</Stack>
              </Stack>
            </Box>
            <ModalWrapper
              open={openChildModal}
              onClose={() => setOpenChildModal(false)}
              sx={typeAction === "openCard" ? { width: 768 } : null}
            >
              <ContextModalCard.Provider value={valueContext}>
                <ModalContent typeAction={typeAction} />
              </ContextModalCard.Provider>
            </ModalWrapper>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
