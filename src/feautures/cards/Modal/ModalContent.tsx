import ChangeCover from "./ChangeCover";
import ChangeDate from "./ChangeDate";
import ChangeMarks from "./ChangeMarks";
import CopyCard from "./CopyCard";
import MoveCard from "./MoveCard";
import OpenCard from "./OpenCard";

type Props = {
  typeAction: CardAction;
};

export default function ModalContent({ typeAction }: Props) {
  if (typeAction === "changeMarks") {
    return <ChangeMarks />;
  } else if (typeAction === "changeCover") {
    return <ChangeCover />;
  } else if (typeAction === "changeDate") {
    return <ChangeDate />;
  } else if (typeAction === "moveCard") {
    return <MoveCard />;
  } else if (typeAction === "copyCard") {
    return <CopyCard />;
  } else {
    return <OpenCard />;
  }
}
