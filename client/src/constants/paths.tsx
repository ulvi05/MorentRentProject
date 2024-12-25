export const paths = {
  home: "/",
  list: "/list",
  detail: (id = ":id") => `/detail/${id}`,
  payment: "/payment",
  reset_password: (token = ":token") => `/reset-password/${token}`,
  DASHBOARD: {
    MAIN: "/dashboard",
    RENTS: {
      LIST: "/dashboard/rents",
      CREATE: "/dashboard/rents/create",
      EDIT: (id: string) => `/dashboard/rents/edit/${id}`,
    },
  },
};
