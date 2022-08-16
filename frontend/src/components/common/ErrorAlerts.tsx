import { Alert, Button, Stack } from "@mui/material";
import * as React from "react";
import { removeError } from "src/redux/features/errors/errorsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

const ErrorAlerts = () => {
  const errors = useAppSelector((state) => state.errors);
  const dispatch = useAppDispatch();
  if (!errors.length) return null;

  return (
    <Stack sx={{ marginTop: "10px" }} spacing={1} display="flex" justifyContent="center" alignItems="center">
      {errors.map((element) => (
        <Alert
          key={element.id}
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              data-remove={element.id}
              onClick={(e) => {
                const target = e.target as HTMLButtonElement;
                dispatch(removeError(target.dataset.remove as string));
              }}
            >
              Hide
            </Button>
          }
        >
          {element.message}
        </Alert>
      ))}
    </Stack>
  );
};

export default ErrorAlerts;
