export const APPLICATION_URLS = {
  categories: "/categories",
  accounts: "/accounts",
  profile: "/profile",
  settings: "/settings",
  logout: "/logout",
  register: "/register",
  login: "/login",
  reports: "/reports",
  home: "/",
};

export const API_URLS = {
  getToken: "/users/login/access-token",
  userInfo: "/users/me",
  register: "/users/register",
  login: "/users/login",

  accounts: "/accounts",
  operations: "/operations",
  currencies: "/currencies",
  categories: "/categories",
  netWorthReport: "/reports/net_worth",
};

export const API_URL: string = process.env.REACT_APP_APPLICATION_API as string;

export const defaultLocale = "de-DE";
