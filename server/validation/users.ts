export const findUserSchema = {
  id: {
    in: ["params"],
    isString: {
      errorMessage: "Id must be a string",
    },
    notEmpty: {
      errorMessage: "Id is required",
    },
  },
};

export const changeUserRoleSchema = {
  id: {
    in: ["params"],
    isString: {
      errorMessage: "Id must be a string",
    },
    notEmpty: {
      errorMessage: "Id is required",
    },
  },
  role: {
    in: ["body"],
    matches: {
      options: [/\b(?:admin|user)\b/],
      errorMessage: "Invalid role",
    },
    isString: {
      errorMessage: "Role must be a string",
    },
    notEmpty: {
      errorMessage: "Role is required",
    },
  },
};
