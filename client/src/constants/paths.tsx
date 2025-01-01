export const paths = {
  home: "/",
  list: "/list",
  detail: (id = ":id") => `/detail/${id}`,
  payment: (id = ":id") => `/payment/${id}`,
  reset_password: (token = ":token") => `/reset-password/${token}`,
  RESERVATIONS: "/reservations",
  DASHBOARD: {
    MAIN: "/dashboard",
    RENTS: {
      LIST: "/dashboard/rents",
      CREATE: "/dashboard/rents/create",
      EDIT: (id: string) => `/dashboard/rents/edit/${id}`,
    },
  },
};
