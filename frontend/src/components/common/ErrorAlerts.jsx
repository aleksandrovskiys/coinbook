import { Alert, Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "src/redux/features/errors/errorsSlice";

const ErrorAlerts = () => {
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  if (!errors.length) return null;

  return (
    <Stack
      sx={{ marginTop: "10px" }}
      spacing={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
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
                dispatch(removeError(e.target.dataset.remove));
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
