import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { AxiosError } from "axios";
import { AuthResponseType } from "@/services/auth/types";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    password: z.string().min(2).max(20),
    confirmPassword: z.string().min(2).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.ResetPassword,
    onSuccess: (response) => {
      toast.success(response.data.message);
      navigate("/");
    },
    onError: (error: AxiosError<AuthResponseType>) => {
      const message =
        error.response?.data?.message ??
        "Something went wrong! Please try again.";
      toast.error(message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast.error("Invalid or expired token");
      return;
    }

    mutate({ password: values.password, token });
  }

  return (
    <div className="max-w-2xl px-4 py-10 mx-auto bg-background">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center lg:text-3xl">
          Reset Your Password
        </h1>
        <p className="mb-8 text-center text-gray-600">
          Please enter your new password below.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="h-5" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="h-5" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 rounded-full loader spinner-border animate-spin border-t-transparent"></span>
                  Resetting...
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
