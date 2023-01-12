import { TextField } from "@mui/material";
import * as React from "react";

interface IProps {
  name: string;
  label: string;
  value?: string | null;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isDisabled: boolean;
}

export function ProfileTextField({ name, label, value, setValue, isDisabled }: IProps): JSX.Element {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      size="small"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      fullWidth
      disabled={isDisabled}
      sx={{
        margin: "10px 0px",
      }}
    />
  );
}
