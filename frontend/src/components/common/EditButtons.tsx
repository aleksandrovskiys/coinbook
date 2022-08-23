import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { Box, Collapse, IconButton } from "@mui/material";
import * as React from "react";

export interface IEditButtonProps {
  show: boolean;
  toggleEditMode: () => void;
  deleteOnClick: () => void;
}

export function EditButtons({ show, toggleEditMode, deleteOnClick }: IEditButtonProps): JSX.Element {
  return (
    <Collapse orientation="horizontal" in={show}>
      <Box flexDirection="row" display="flex" alignItems="center">
        <IconButton onClick={toggleEditMode}>
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={deleteOnClick}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Collapse>
  );
}
