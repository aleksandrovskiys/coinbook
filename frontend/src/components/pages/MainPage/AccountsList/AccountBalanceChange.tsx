import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import * as React from "react";

export function AccountBalanceChange({ change, displayText }: { change: number; displayText: string }) {
  const color = change > 0 ? "#0BDA51" : change < 0 ? "crimson" : "black";
  const iconComponent =
    change > 0 ? (
      <ArrowDropUpIcon sx={{ color: color }} />
    ) : change < 0 ? (
      <ArrowDropDownIcon sx={{ color: color }} />
    ) : null;

  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "right",
        color: color,
      }}
    >
      {iconComponent}
      {`${displayText}`}
    </span>
  );
}
