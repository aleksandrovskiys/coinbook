import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box, IconButton } from "@mui/material";
import * as React from "react";

export interface ISubmitCancelButtonsProps {
  updateIconOnClick: React.FormEventHandler;
  cancelIconOnClick: React.FormEventHandler;
}

export function SubmitCancelButtons({ updateIconOnClick, cancelIconOnClick }: ISubmitCancelButtonsProps): JSX.Element {
  return (
    <Box>
      <IconButton onClick={updateIconOnClick}>
        <DoneIcon fontSize="small" color="success" />
      </IconButton>
      <IconButton onClick={cancelIconOnClick}>
        <CloseIcon fontSize="small" color="error" />
      </IconButton>
    </Box>
  );
}
