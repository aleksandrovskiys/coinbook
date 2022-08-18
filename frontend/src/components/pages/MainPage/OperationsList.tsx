import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import * as React from "react";
import { fetchOperations, Operation } from "src/redux/features/operations/operationsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

function OperationListItem({ operation }: { operation: Operation }) {
  const amount = operation.amount.toLocaleString("de-DE", {
    style: "currency",
    currency: operation.account.currency.code,
  });
  const categoryName = operation.category?.name || "Balance correction";
  const date = new Date(operation.date);
  return (
    <ListItem disablePadding divider sx={{ padding: "2px 16px" }}>
      <ListItemText
        primary={
          <React.Fragment>
            {operation.account.name} - {operation.type}
            <Typography align="right" component="span" sx={{ display: "inline", float: "right" }}>
              {`${amount}`}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            {date.toLocaleString()}
            <Typography align="right" component="span" sx={{ display: "inline", float: "right" }}>
              {`${categoryName}`}
            </Typography>
          </React.Fragment>
        }
      ></ListItemText>
    </ListItem>
  );
}

export function OperationsList() {
  const dispatch = useAppDispatch();
  const operations = useAppSelector((state) => state.operations.operations);
  const isLoggedIn = !!useAppSelector((state) => state.users.userInfo);

  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchOperations());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <React.Fragment>
      <Typography variant="h4" align="center" marginBottom={2} marginTop={6}>
        Operations
      </Typography>
      <Paper sx={{ width: "100%" }} elevation={4}>
        <List disablePadding>
          {operations?.map((operation) => (
            <OperationListItem key={operation.id} operation={operation} />
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
