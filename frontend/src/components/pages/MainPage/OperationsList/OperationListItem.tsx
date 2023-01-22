import { ListItem } from "@mui/material";
import * as React from "react";
import { ListChildComponentProps } from "react-window";
import { EditButtons } from "src/components/common/EditButtons";
import { SubmitCancelButtons } from "src/components/common/SubmitCancelButtons";
import { EditOperation } from "src/components/pages/MainPage/OperationsList/EditOperation";
import { deleteOperation, Operation, updateOperation } from "src/redux/features/operations/operationsSlice";
import { useAppDispatch } from "src/redux/hooks";
import { ShowOperation } from "./ShowOperation";

export function OperationListItem(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const operation = data[index];

  const dispatch = useAppDispatch();

  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [isEditButtonsShown, setIsEditButtonsShown] = React.useState<boolean>(false);
  const [editedOperation, setEditedOperation] = React.useState<Operation>({ ...operation });

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

  return (
    <ListItem
      disablePadding
      divider
      style={style}
      key={index}
      sx={{ padding: "2px 16px" }}
      onMouseOver={() => setIsEditButtonsShown(true)}
      onMouseOut={() => setIsEditButtonsShown(false)}
    >
      {isEditMode ? (
        <EditOperation operation={operation} setOperation={setEditedOperation} />
      ) : (
        <ShowOperation operation={operation} />
      )}
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
