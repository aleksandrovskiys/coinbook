import { Box, Button, Paper, Typography } from "@mui/material";
import * as React from "react";
import { FixedSizeList } from "react-window";
import { AddOperationForm } from "src/components/pages/MainPage/OperationsList/AddOperationForm";
import { OperationListItem } from "src/components/pages/MainPage/OperationsList/OperationListItem";
import { UserCategoryTypes } from "src/redux/features/categories/categoriesSlice";
import { Operation, resetOperationCreationStatus } from "src/redux/features/operations/operationsSlice";
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
      dispatch(resetOperationCreationStatus());
    }
  }, [dispatch, operationCreationStatus]);

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
        {operations.length ? (
          <FixedSizeList
            height={window.innerHeight}
            width="100%"
            itemSize={70}
            itemCount={operations.length}
            itemData={operations}
          >
            {({ index, style, data }) => <OperationListItem data={data} index={index} style={style} />}
          </FixedSizeList>
        ) : (
          <Typography variant="h6" align="center">
            You have no operations yet
          </Typography>
        )}
      </Paper>
    </React.Fragment>
  );
}
