import { Box, Button } from "@mui/material";
import * as React from "react";

interface IProps {
  cancelOnClick: React.MouseEventHandler<HTMLElement>;
}

export function SaveObjectButtons({ cancelOnClick }: IProps): JSX.Element {
  return (
    <Box display="flex" justifyContent="flex-end" sx={{ height: "100%" }}>
      <Button variant="outlined" type="submit" size="small" sx={{ height: "100%" }}>
        Save
      </Button>
      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{ marginLeft: "5px", height: "100%" }}
        onClick={cancelOnClick}
      >
        Cancel
      </Button>
    </Box>
  );
}
