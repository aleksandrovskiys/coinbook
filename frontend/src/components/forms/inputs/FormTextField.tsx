import TextField from "@mui/material/TextField";
import { MuiTextFieldProps } from "@mui/x-date-pickers/internals/components/PureDateInput";
import * as React from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

interface IProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Pick<
      MuiTextFieldProps,
      | "onChange"
      | "value"
      | "placeholder"
      | "required"
      | "label"
      | "error"
      | "disabled"
      | "autoComplete"
      | "multiline"
      | "maxRows"
      | "type"
      | "inputProps"
    > {
  fullWidth: boolean;
}

function FormTextField<T extends FieldValues>(props: IProps<T>) {
  const { name, control, rules, fullWidth, label } = props;

  const { field, fieldState } = useController({ name, control, rules });
  const errorMessage = fieldState.invalid ? fieldState.error?.message || "Invalid value" : "";
  return (
    <>
      <TextField
        {...props}
        required={Boolean(rules?.required)}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        inputRef={field.ref}
        fullWidth={fullWidth}
        label={label}
        error={Boolean(fieldState.invalid)}
        helperText={errorMessage}
      />
    </>
  );
}

export default FormTextField;
