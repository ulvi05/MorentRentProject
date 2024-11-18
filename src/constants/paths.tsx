export const paths = {
  home: "/",
  list: "/list",
  detail: (id = ":id") => `/detail/${id}`,
  payment: "/payment",
};
