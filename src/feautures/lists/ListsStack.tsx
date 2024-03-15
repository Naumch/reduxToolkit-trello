import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectListsdByBoardId } from "./listsSlice";

import { Stack, Button } from "@mui/material";
import ListItem from "./ListItem";
import FormAddNewList from "./FormAddNewList";

type Props = {
  boardId: string;
};

export default function ListsStack({ boardId }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const lists = useAppSelector((state) =>
    selectListsdByBoardId(state, boardId)
  );

  const renderedLists = lists.map((list) => <ListItem list={list} />);

  return (
    <Stack mt={5} direction="row" alignItems="start" spacing={2}>
      {renderedLists}
      {isEditing ? (
        <FormAddNewList boardId={boardId} setIsEditing={setIsEditing} />
      ) : (
        <Button
          sx={{ width: 272 }}
          onClick={() => setIsEditing(true)}
          variant="contained"
        >
          {renderedLists.length
            ? "Добавьте еще одну колонку"
            : "Добавьте список"}
        </Button>
      )}
    </Stack>
  );
}
