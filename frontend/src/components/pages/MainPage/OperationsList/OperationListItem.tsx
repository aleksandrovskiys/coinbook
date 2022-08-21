import { ListItem, ListItemText, Typography } from "@mui/material";
import * as moment from "moment";
import * as React from "react";
import { defaultLocale } from "src/common/constants";
import { Operation } from "src/redux/features/operations/operationsSlice";

export function OperationListItem({ operation }: { operation: Operation }) {
  const amount = operation.amount.toLocaleString(defaultLocale, {
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
            {moment(date).add(-date.getTimezoneOffset(), "minutes").toDate().toLocaleString()}
            <Typography align="right" component="span" sx={{ display: "inline", float: "right" }}>
              {`${categoryName}`}
            </Typography>
          </React.Fragment>
        }
      ></ListItemText>
    </ListItem>
  );
}
