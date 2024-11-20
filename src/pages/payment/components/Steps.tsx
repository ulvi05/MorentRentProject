import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/pages/detail/components/PhoneInput";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(10, { message: "Phone number must be valid." }),
});

type FormType = UseFormReturn<z.infer<typeof FormSchema>>;

export const Steps = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="flex flex-col lg:gap-y-8 gap-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <BillingStep form={form} />
        </form>
      </Form>
    </div>
  );
};

const BillingStep = ({ form }: { form: FormType }) => {
  return (
    <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
            Billing Info
          </h3>
          <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
            Please enter your billing info
          </p>
        </div>
        <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
          Step 1 of 4
        </p>
      </div>
      <div className="grid items-end grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PhoneInput
          value={form.getValues("phone")}
          onChange={(value) => form.setValue("phone", value)}
          placeholder="Your Number"
        />
      </div>
    </div>
  );
};
