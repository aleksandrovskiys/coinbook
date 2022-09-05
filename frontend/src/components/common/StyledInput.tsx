import { Input, styled } from "@mui/material";

export const StyledInput = styled(Input)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    display: none;
  }
`;
