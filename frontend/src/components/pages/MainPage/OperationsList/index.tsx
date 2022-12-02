import { Box, Button, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { AddOperationForm } from "src/components/pages/MainPage/OperationsList/AddOperationForm";
import { OperationListItem } from "src/components/pages/MainPage/OperationsList/OperationListItem";
import { UserCategoryTypes } from "src/redux/features/categories/categoriesSlice";
import { Operation } from "src/redux/features/operations/operationsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

interface IProps {
  operations: Operation[];
}

export function OperationsList({ operations }: IProps) {
  const dispatch = useAppDispatch();

  const operationCreationStatus = useAppSelector((state) => state.operations.operationCreationStatus);
  const [newOperationType, setNewOperationType] = React.useState<UserCategoryTypes>("expense");

  const [addOperationToggle, setAddOperationToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (operationCreationStatus === "succeeded") {
      setAddOperationToggle(false);
    }
  }, [dispatch, operationCreationStatus]);

  const content = operations.length ? (
    operations.map((operation) => <OperationListItem key={operation.id} operation={operation} />)
  ) : (
    <Typography variant="h6" align="center">
      You have no operations yet
    </Typography>
  );
  return (
    <React.Fragment>
      {!addOperationToggle && (
        <Box display="flex" marginTop="30px">
          <Button
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            color="error"
            size="small"
            onClick={() => {
              setAddOperationToggle(!addOperationToggle);
              setNewOperationType("expense");
            }}
          >
            Add expense
          </Button>
          <Button
            variant="outlined"
            sx={{ marginBottom: "10px", marginLeft: "5px" }}
            color="success"
            size="small"
            onClick={() => {
              setAddOperationToggle(!addOperationToggle);
              setNewOperationType("income");
            }}
          >
            Add income
          </Button>
        </Box>
      )}
      {addOperationToggle && (
        <AddOperationForm setAddOperationToggle={setAddOperationToggle} operationType={newOperationType} />
      )}
      <Paper sx={{ width: "100%" }} elevation={4}>
        <List disablePadding>{content}</List>
      </Paper>
    </React.Fragment>
  );
}
