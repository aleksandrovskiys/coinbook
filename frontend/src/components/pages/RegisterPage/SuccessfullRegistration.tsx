import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";
import { setRegistrationStatusIdle } from "src/redux/features/users/usersSlice";
import { useAppDispatch } from "src/redux/hooks";

export const SuccessfullRegistration = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>Registration succeeded!</Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          dispatch(setRegistrationStatusIdle());
          navigate(APPLICATION_URLS.login, { replace: true });
        }}
      >
        Go to login
      </Button>
    </Box>
  );
};

export default SuccessfullRegistration;
