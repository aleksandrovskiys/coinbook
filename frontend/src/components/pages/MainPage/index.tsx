import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  styled,
  ThemeProvider,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useAppSelector } from "src/redux/hooks";
import { AccountsList } from "./AccountsList";
import { CategoriesList } from "./CategoriesList";
import { OperationsList } from "./OperationsList";

const theme = createTheme();

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

export default function MainPage() {
  const userInfo = useAppSelector((state) => state.users.userInfo);

  if (!userInfo) return <CssBaseline />;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <Grid container spacing={5} rowSpacing={5}>
            <Grid item xs={4}>
              <AccountsList />
              <Typography variant="h4" align="center" marginBottom={2} marginTop={2}>
                Expenses
              </Typography>
              <CategoriesList categoryType="expense" />
              <Typography variant="h4" align="center" marginBottom={2} marginTop={2}>
                Income
              </Typography>
              <CategoriesList categoryType="income" />
            </Grid>
            <Grid item xs={8}>
              <OperationsList />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
