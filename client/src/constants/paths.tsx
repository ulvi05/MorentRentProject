export const paths = {
  home: "/",
  list: "/list",
  detail: (id = ":id") => `/detail/${id}`,
  payment: "/payment",
  reset_password: (token = ":token") => `/reset-password/${token}`,
  DASHBOARD: {
    MAIN: "/dashboard",
    RENTS: "/dashboard/rents",
  },
};
