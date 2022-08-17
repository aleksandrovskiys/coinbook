export const APPLICATION_URLS = {
  categories: "/categories",
  accounts: "/accounts",
  profile: "/profile",
  settings: "/settings",
  logout: "/logout",
  register: "/register",
  login: "/login",
  home: "/",
};

export const API_URLS = {
  getToken: "/users/login/access-token",
  userInfo: "/users/me",
  register: "/users/register",
  login: "/users/login",

  getUserAccounts: "/accounts",
  getOperations: "/operations",
};

export const API_URL: string = process.env.REACT_APP_APPLICATION_API as string;
