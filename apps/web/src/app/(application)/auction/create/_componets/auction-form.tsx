"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { type TCreateAuctionInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

interface LabelWrapperProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}

function InputWrapper({
  label,
  children,
  className,
  error,
}: LabelWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="font-semibold text-gray-700">{label}</label>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

const AuctionForm = ({
  defaultValues,
  actionName,
}: {
  defaultValues?: TCreateAuctionInput;
  actionName: string;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const [date, setDate] = React.useState<Date | undefined>(
    defaultValues?.endsAt,
  );

  const onSubmit = (data: TCreateAuctionInput) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-[20px] rounded-[32px] bg-white px-[80px] py-[40px]">
        <InputWrapper label="Auction title">
          <Input
            {...register("title")}
            className="bg-slate-50"
            placeholder="Specify what you are selling"
          />
        </InputWrapper>

        <InputWrapper label="Minimal price (in usd)">
          <Input
            {...register("price")}
            className="bg-slate-50"
            placeholder="Specify minimal price of the thing"
          />
        </InputWrapper>
        <InputWrapper label="Auction end date">
          <Controller
            name={"endsAt"}
            control={control}
            render={() => (
              <DatePicker
                date={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setValue("endsAt", newDate, { shouldValidate: true });
                }}
              />
            )}
          />
        </InputWrapper>
        <InputWrapper label="Auction description">
          <Textarea {...register("description")} className="bg-slate-50" />
        </InputWrapper>
      </section>
      <section className="rounded-[32px] bg-white px-[80px] py-[40px]">
        <Button type="submit">{actionName}</Button>
      </section>
    </form>
  );
};
export { AuctionForm };
