import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import * as React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { APPLICATION_URLS } from "src/common/constants";
import FormTextField from "src/components/forms/inputs/FormTextField";
import { emailValidationRules } from "src/components/forms/rules";

export interface LoginFormData extends FieldValues {
  email: string;
  password: string;
}

interface IProps {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm = ({ onSubmit }: IProps) => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <FormTextField
        name={"email"}
        label={"Email Address"}
        rules={emailValidationRules}
        control={control}
        fullWidth
        margin="normal"
      />
      <FormTextField
        rules={{ required: "Password is required field." }}
        name={"password"}
        label={"Password"}
        type={"password"}
        control={control}
        fullWidth
        margin="normal"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid
        container
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid item>
          <Link to={APPLICATION_URLS.register} component={RouterLink} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
