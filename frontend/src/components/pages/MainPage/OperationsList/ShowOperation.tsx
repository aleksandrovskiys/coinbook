import { ListItemText, Tooltip, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import * as React from "react";
import { defaultColor, expenseColor, incomeColor } from "src/common/colors";
import { defaultLocale } from "src/common/constants";
import { Operation } from "src/redux/features/operations/operationsSlice";
import { formatDateWithoutSeconds } from "src/utils/common";

export function ShowOperation({ operation }: { operation: Operation }): JSX.Element {
  const date = new Date(operation.date);
  const relativeDate = formatDistanceToNow(date);
  return (
    <ListItemText
      primary={
        <React.Fragment>
          {operation.account.name}
          <Typography
            align="right"
            component="span"
            sx={{
              display: "inline",
              float: "right",
              color:
                operation.category?.type === "income"
                  ? incomeColor
                  : operation.category?.type === "expense"
                  ? expenseColor
                  : defaultColor,
            }}
          >
            {`${operation.amount.toLocaleString(defaultLocale, {
              style: "currency",
              currency: operation.account.currency.code,
            })}`}
          </Typography>
        </React.Fragment>
      }
      secondary={
        <React.Fragment>
          <Tooltip title={`${relativeDate} ago`} placement="right">
            <Typography component="span">{formatDateWithoutSeconds(date)}</Typography>
          </Tooltip>
          <Typography align="right" component="span" sx={{ display: "inline", float: "right" }}>
            {`${operation.category?.name || "Unknown"}`}
          </Typography>
        </React.Fragment>
      }
    ></ListItemText>
  );
}
