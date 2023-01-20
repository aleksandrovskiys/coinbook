import { Button, Container, Paper } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import CurrencySelector from "src/components/common/CurrencySelector";
import { useCurrencies } from "src/redux/features/accounts/hooks/useCurrencies";
import { useUser } from "src/redux/features/users/hooks";
import { updateUserInformation } from "src/redux/features/users/usersSlice";
import { useAppDispatch } from "src/redux/hooks";
import { ProfileTextField } from "./ProfileTextField";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const currentUser = useUser();
  const currencies = useCurrencies();

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [defaultCurrency, setDefaultCurrency] = React.useState<string>("");

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.first_name || "");
      setLastName(currentUser.last_name || "");
      setDefaultCurrency(currentUser.default_currency_code || "");
    }
  }, [currentUser]);

  if (currentUser == null) return <h1>Loading...</h1>;

  const saveButtonOnClick = () => {
    dispatch(updateUserInformation({ ...currentUser, default_currency_code: defaultCurrency }));
    setEditMode(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={4} sx={{ marginTop: "15px", padding: "15px" }}>
        <ProfileTextField
          name={"firstName"}
          label={"First Name"}
          value={firstName}
          setValue={setFirstName}
          isDisabled={true}
        />
        <ProfileTextField
          name={"lastName"}
          label={"Last Name"}
          value={lastName}
          setValue={setLastName}
          isDisabled={true}
        />
        <CurrencySelector
          value={defaultCurrency}
          setValue={setDefaultCurrency}
          currencies={currencies}
          disabled={!editMode}
        />
        {!editMode && <Button onClick={() => setEditMode(!editMode)}>Edit Profile</Button>}
        {editMode && <Button onClick={() => saveButtonOnClick()}>Save Profile</Button>}
      </Paper>
    </Container>
  );
}
