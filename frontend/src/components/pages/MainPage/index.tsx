import { Box, Container, createTheme, CssBaseline, Grid, Paper, styled, ThemeProvider } from "@mui/material";
import * as React from "react";
import { AccountsList } from "src/components/pages/MainPage/AccountsList";
import { CategoriesList } from "src/components/pages/MainPage/CategoriesList";
import { OperationsList } from "src/components/pages/MainPage/OperationsList";
import { useAppSelector } from "src/redux/hooks";

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
            <Grid item sm={4} xs={12}>
              <AccountsList />
              <CategoriesList categoryType="expense" />
              <CategoriesList categoryType="income" />
            </Grid>
            <Grid item sm={8} xs={12}>
              <OperationsList />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
