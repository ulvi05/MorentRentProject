import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/redux";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

import { AuthResponseType } from "@/services/auth/types";
import authService from "@/services/auth";
import { useDialog, ModalTypeEnum } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCurrentUserAsync } from "@/store/features/userSlice";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(20),
});

export const LoginDialog = () => {
  const { isOpen, closeDialog, type, openDialog } = useDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      toast.success(response.data.message);
      form.reset();
      closeDialog();
      dispatch(getCurrentUserAsync());
    },
    onError: (error: AxiosError<AuthResponseType>) => {
      const message =
        error.response?.data.message ??
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  if (isOpen && type !== ModalTypeEnum.LOGIN) {
    return null;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-3xl">Sign In</DialogTitle>
          <DialogDescription>
            Don't have an account?{" "}
            <button
              onClick={() => openDialog(ModalTypeEnum.REGISTER)}
              className="text-primary"
            >
              Create an account
            </button>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Type password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              className="text-sm underline text-primary"
              onClick={() => openDialog(ModalTypeEnum.FORGOT)}
              type="button"
            >
              Forgot Password?
            </button>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 rounded-full loader spinner-border animate-spin border-t-transparent"></span>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
