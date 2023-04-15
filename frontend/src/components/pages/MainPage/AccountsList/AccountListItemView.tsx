import { Typography } from "@mui/material";
import * as React from "react";
import { EditableTextField } from "src/components/common/EditableTextField";

interface IProps {
  accountName: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  formattedBalance: string;
}

export function AccountListItemView({ accountName, setEditMode, formattedBalance }: IProps): React.ReactElement {
  return (
    <>
      <EditableTextField
        isEditMode={false}
        value={accountName}
        setValue={() => {}}
        setEditMode={setEditMode}
        textFieldSx={{ flexGrow: 1, maxWidth: "30%" }}
      />
      <Typography
        onClick={() => {
          setEditMode(true);
        }}
        sx={{ marginLeft: "auto", marginRight: "5px" }}
      >
        {formattedBalance}
      </Typography>
    </>
  );
}

export default AccountListItemView;
