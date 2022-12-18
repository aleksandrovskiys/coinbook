import { Typography } from "@mui/material";
import * as React from "react";
import { defaultLocale } from "src/common/constants";

export interface CurrencyTotal {
  currencyCode: string;
  total: number;
}

const AccountsTotal = ({ total, currencyCode }: CurrencyTotal) => {
  const formattedTotal = total.toLocaleString(defaultLocale, {
    style: "currency",
    currency: currencyCode,
  });
  return (
    <Typography textAlign="right" paddingRight="16px" paddingBottom="15px">
      {formattedTotal}
    </Typography>
  );
};

export default AccountsTotal;
