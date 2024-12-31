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
import { PhoneInput } from "./PhoneInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import SecurityImg from "@/assets/icons/security.svg";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { RenderIf } from "@/components/shared/RenderIf";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { GetByIdRentResponse } from "@/services/rent/types";
import { AxiosResponse } from "axios";
import { Location } from "@/types";
import { useEffect } from "react";

const FormSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  phone: z.string().min(10, { message: "Phone number must be valid." }),
  address: z.string().min(4, { message: "Address must be least 4 characters" }),
  city: z.string().min(4, { message: "City must be least 4 characters" }),
  pickUpLocation: z
    .string()
    .min(1, { message: "Pick up location is required" }),
  dropUpLocation: z
    .string()
    .min(1, { message: "Drop off location is required" }),
  pickUpDate: z.string().min(1, { message: "Pick up date is required" }),
  dropUpDate: z.string().min(1, { message: "Drop off date is required" }),
  newsLetter: z.literal<boolean>(true, {
    message: "You must agree to receive newsletter",
  }),
  termsConditions: z.literal<boolean>(true, {
    message: "You must agree to terms and conditions",
  }),
});

type FormType = UseFormReturn<z.infer<typeof FormSchema>>;

export const Steps = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      pickUpLocation: "",
      dropUpLocation: "",
      pickUpDate: "",
      dropUpDate: "",
      newsLetter: false,
      termsConditions: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col order-1 lg:gap-y-8 gap-y-6 lg:order-none"
      >
        <BillingStep form={form} />
        <RentalStep form={form} />
        <ConfirmationStep form={form} />
      </form>
    </Form>
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
          Step 1 of 3
        </p>
      </div>
      <div className="grid items-end sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
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
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  placeholder="Your Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Your Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Town / City</FormLabel>
              <FormControl>
                <Input placeholder="Town or City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const RentalStep = ({ form }: { form: FormType }) => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([
    QUERY_KEYS.RENT_DETAIL,
    id,
  ]) as AxiosResponse;
  const rentData = (data?.data as GetByIdRentResponse) || null;
  const possibleDropOffLocations =
    (rentData?.item.dropOffLocation as Location[]) ?? [];
  const pickupLocation = rentData?.item.pickUpLocation as Location;

  useEffect(() => {
    form.setValue("pickUpLocation", pickupLocation._id);
  }, []);
  return (
    <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
            Rental Info
          </h3>
          <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
            Please select your rental date
          </p>
        </div>
        <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
          Step 2 of 3
        </p>
      </div>
      <div className="flex items-center mb-4 gap-x-2 lg:mb-6">
        <span className="inline-block w-4 h-4 border-4 rounded-full border-[#3563e94d]">
          <span className="block w-2 h-2 rounded-full bg-primary" />
        </span>
        <p className="text-base font-semibold text-secondary-500 leading-[20px] tracking-[-0.32px]">
          Pick - Up
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
        <FormField
          control={form.control}
          name="pickUpLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locations</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={pickupLocation._id} disabled>
                    {pickupLocation.name}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pickUpDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <DatePicker
                hidePastDates
                variant="secondary"
                onChange={(date) => field.onChange(date?.toISOString() || "")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex items-center mt-8 mb-4 gap-x-2 lg:mb-6">
        <span className="inline-block w-4 h-4 border-4 rounded-full border-[#3563e94d]">
          <span className="block w-2 h-2 rounded-full bg-information" />
        </span>
        <p className="text-base font-semibold text-secondary-500 leading-[20px] tracking-[-0.32px]">
          Drop - Off
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 lg:gap-y-6">
        <FormField
          control={form.control}
          name="dropUpLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locations</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <RenderIf condition={possibleDropOffLocations.length === 0}>
                    <SelectItem value="-" disabled>
                      No drop off locations available
                    </SelectItem>
                  </RenderIf>
                  {possibleDropOffLocations.map((location) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropUpDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <DatePicker
                hidePastDates
                variant="secondary"
                onChange={(date) => field.onChange(date?.toISOString() || "")}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const ConfirmationStep = ({ form }: { form: FormType }) => {
  const errors = form.formState.errors;

  return (
    <div className="rounded-[10px] bg-white w-full lg:p-6 p-4">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500">
            Confirmation
          </h3>
          <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6">
            We are getting to the end. Just few clicks and your rental is ready!
          </p>
        </div>
        <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 text-nowrap xl:text-wrap">
          Step 3 of 3
        </p>
      </div>
      <FormField
        control={form.control}
        name="newsLetter"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start p-4 lg:px-8 space-x-5 space-y-0 rounded-[10px] bg-[#F6F7F9]">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="leading-none">
              <FormLabel
                className={cn(
                  "cursor-pointer",
                  errors.termsConditions && "text-red-500"
                )}
              >
                I agree with sending an Marketing and newsletter emails. No
                spam, promissed!
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="termsConditions"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start p-4 lg:px-8 space-x-5 space-y-0 rounded-[10px] bg-[#F6F7F9] mt-6">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="leading-none">
              <FormLabel
                className={cn(
                  "cursor-pointer",
                  errors.termsConditions && "text-red-500"
                )}
              >
                I agree with our terms and conditions and privacy policy.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <Button className="mt-6 lg:mt-8">Rent Now</Button>
      <div className="flex flex-col mt-4 gap-y-4 lg:mt-8">
        <img src={SecurityImg} alt="security-icn" className="w-8 h-8" />
        <div className="flex flex-col items-start gap-1 lg:gap-2">
          <h4 className="text-base font-semibold text-secondary-500 !tracking-[-0.32px]">
            All your data are safe
          </h4>
          <p className="text-secondary-300 font-medium text-sm leading-[150%]">
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
    </div>
  );
};
