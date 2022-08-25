import { Box, Button, List, Paper, Typography } from "@mui/material";
import * as React from "react";
import { AddOperationForm } from "src/components/pages/MainPage/OperationsList/AddOperationForm";
import { OperationListItem } from "src/components/pages/MainPage/OperationsList/OperationListItem";
import { UserCategoryTypes } from "src/redux/features/categories/categoriesSlice";
import { clearNewOperation, createOperation, fetchOperations } from "src/redux/features/operations/operationsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

export function OperationsList() {
  const dispatch = useAppDispatch();
  const operations = useAppSelector((state) => state.operations.operations);
  const isLoggedIn = !!useAppSelector((state) => state.users.userInfo);
  const newOperation = useAppSelector((state) => state.operations.newOperation);
  const operationCreationStatus = useAppSelector((state) => state.operations.operationCreationStatus);
  const [newOperationType, setNewOperationType] = React.useState<UserCategoryTypes>("expense");

  const [addOperationToggle, setAddOperationToggle] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOperations());
    }
  }, [dispatch, isLoggedIn]);

  React.useEffect(() => {
    if (operationCreationStatus === "succeeded") {
      setAddOperationToggle(false);
      dispatch(clearNewOperation());
    }
  }, [dispatch, operationCreationStatus]);

  const addOperationOnSubmit = (event) => {
    event.preventDefault();
    dispatch(createOperation(newOperation));
  };

  const content = operations.length ? (
    operations.map((operation) => <OperationListItem key={operation.id} operation={operation} />)
  ) : (
    <Typography variant="h6" align="center">
      You have no operations yet
    </Typography>
  );
  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Operations
      </Typography>
      {!addOperationToggle && (
        <Box display="flex">
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
        <AddOperationForm
          addOperationOnSubmit={addOperationOnSubmit}
          setAddOperationToggle={setAddOperationToggle}
          operationType={newOperationType}
        />
      )}
      <Paper sx={{ width: "100%" }} elevation={4}>
        <List disablePadding>{content}</List>
      </Paper>
    </React.Fragment>
  );
}
