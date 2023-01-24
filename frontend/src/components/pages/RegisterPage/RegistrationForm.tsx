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

interface IProps {
  onSubmit: (data: RegistrationFormValues) => void;
}

export interface RegistrationFormValues extends FieldValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegistrationForm = ({ onSubmit }: IProps) => {
  const { handleSubmit, control } = useForm<RegistrationFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormTextField
            name={"firstName"}
            label={"First Name"}
            rules={{
              required: "First name is required field.",
            }}
            fullWidth
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            name={"lastName"}
            label={"Last Name"}
            rules={{ required: "Last name is required field." }}
            fullWidth
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            name={"email"}
            label={"Email Address"}
            rules={emailValidationRules}
            fullWidth
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            name={"password"}
            label={"Password"}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must have at least 6 characters." },
            }}
            fullWidth
            control={control}
            type="password"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link variant="body2" to={APPLICATION_URLS.login} component={RouterLink}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegistrationForm;
