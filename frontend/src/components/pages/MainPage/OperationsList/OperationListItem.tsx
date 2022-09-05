import { ListItem } from "@mui/material";
import * as React from "react";
import { EditButtons } from "src/components/common/EditButtons";
import { SubmitCancelButtons } from "src/components/common/SubmitCancelButtons";
import { EditOperation } from "src/components/pages/MainPage/OperationsList/EditOperation";
import { deleteOperation, Operation, updateOperation } from "src/redux/features/operations/operationsSlice";
import { useAppDispatch } from "src/redux/hooks";
import { ShowOperation } from "./ShowOperation";

export function OperationListItem({ operation }: { operation: Operation }) {
  const dispatch = useAppDispatch();

  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [isEditButtonsShown, setIsEditButtonsShown] = React.useState<boolean>(false);

  const toggleIsEdit = () => setEditMode(!isEditMode);
  const cancelIconOnClick = () => {
    setEditMode(false);
  };

  const updateIconOnClick = () => {
    dispatch(updateOperation(editedOperation));
    setEditMode(false);
  };

  const deleteOnClick = () => {
    dispatch(deleteOperation(operation));
  };

  let editedOperation = {
    ...operation,
  };

  return (
    <ListItem
      disablePadding
      divider
      sx={{ padding: "2px 16px" }}
      onMouseOver={() => setIsEditButtonsShown(true)}
      onMouseOut={() => setIsEditButtonsShown(false)}
    >
      {isEditMode ? <EditOperation operation={editedOperation} /> : <ShowOperation operation={operation} />}
      {!isEditMode ? (
        operation.category?.type !== "balance_correction" ? (
          <EditButtons show={isEditButtonsShown} toggleEditMode={toggleIsEdit} deleteOnClick={deleteOnClick} />
        ) : null
      ) : (
        <SubmitCancelButtons cancelIconOnClick={cancelIconOnClick} updateIconOnClick={updateIconOnClick} />
      )}
    </ListItem>
  );
}
