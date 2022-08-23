import { SxProps, TextField, Typography } from "@mui/material";
import * as React from "react";

type TextFieldTypes = number | string;

export interface IEditableFieldsProps {
  isEditMode: boolean;
  value: TextFieldTypes;
  setValue: React.Dispatch<React.SetStateAction<TextFieldTypes>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  textFieldSx?: SxProps;
  typographySx?: SxProps;
  typographyValue?: string;
}

export function EditableTextField({
  isEditMode,
  value,
  setValue,
  setEditMode,
  textFieldSx,
  typographySx,
  typographyValue,
}: IEditableFieldsProps): JSX.Element {
  return isEditMode ? (
    <TextField
      variant="standard"
      value={value}
      disabled={!isEditMode}
      onChange={(e) => setValue(e.target.value)}
      sx={textFieldSx}
    />
  ) : (
    <Typography
      onClick={() => {
        setEditMode(true);
      }}
      sx={typographySx}
    >
      {typographyValue || value}
    </Typography>
  );
}
