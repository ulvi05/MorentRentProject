import { ForgotPasswordDialog } from "./ForgotPassword";
import { LoginDialog } from "./Login";
import { RegisterDialog } from "./Register";

export const DialogProvider = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
      <ForgotPasswordDialog />
    </>
  );
};
