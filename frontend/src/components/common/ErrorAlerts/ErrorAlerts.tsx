import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { removeError } from "src/redux/features/errors/errorsSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

const ErrorAlerts = () => {
  const errors = useAppSelector((state) => state.errors);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    for (const error of errors) {
      enqueueSnackbar(error.message, { variant: "error" });
      dispatch(removeError(error.id));
    }
  }, [dispatch, enqueueSnackbar, errors]);
  return null;
};

export default ErrorAlerts;
