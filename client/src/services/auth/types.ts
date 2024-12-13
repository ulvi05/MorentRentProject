import { User } from "@/types";

export type LoginRequestPayloadType = {
  email: string;
  password: string;
};

export type RegisterRequestPayloadType = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type AuthResponseType = {
  message: string;
  user: User;
};
