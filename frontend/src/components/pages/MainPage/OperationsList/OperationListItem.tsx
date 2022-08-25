import { ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { addMinutes, formatDistanceToNow } from "date-fns";
import * as React from "react";
import { defaultColor, expenseColor, incomeColor } from "src/common/colors";
import { defaultLocale } from "src/common/constants";
import { Operation } from "src/redux/features/operations/operationsSlice";

export function OperationListItem({ operation }: { operation: Operation }) {
  const amount = operation.amount.toLocaleString(defaultLocale, {
    style: "currency",
    currency: operation.account.currency.code,
  });
  const color =
    operation.category?.type === "income"
      ? incomeColor
      : operation.category?.type === "expense"
      ? expenseColor
      : defaultColor;
  const categoryName = operation.category?.name || "Unknown";
  const date = new Date(operation.date);
  const dateInCurrentTZ = addMinutes(date, -date.getTimezoneOffset());
  const relativeDate = formatDistanceToNow(dateInCurrentTZ);
  return (
    <ListItem disablePadding divider sx={{ padding: "2px 16px" }}>
      <ListItemText
        primary={
          <React.Fragment>
            {operation.account.name}
            <Typography align="right" component="span" sx={{ display: "inline", float: "right", color: color }}>
              {`${amount}`}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Tooltip title={dateInCurrentTZ.toLocaleString()} placement="top">
              <Typography component="span">{relativeDate} ago</Typography>
            </Tooltip>
            <Typography align="right" component="span" sx={{ display: "inline", float: "right" }}>
              {`${categoryName}`}
            </Typography>
          </React.Fragment>
        }
      ></ListItemText>
    </ListItem>
  );
}
