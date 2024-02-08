"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { type TAuctionInput, auctionSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhotoInputField } from "@/app/(application)/auction/create/_componets/photo-input";

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
  defaultValues?: TAuctionInput;
  actionName: string;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues, resolver: zodResolver(auctionSchema) });

  const [date, setDate] = React.useState<Date | undefined>(
    defaultValues?.endsAt,
  );

  const onSubmit = (data: TAuctionInput) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-[20px] flex flex-col gap-4 rounded-[32px] bg-white px-[80px] py-[40px]">
        <InputWrapper label="Auction title" error={errors.title?.message}>
          <Input
            {...register("title")}
            className="bg-slate-50"
            placeholder="Specify what you are selling"
          />
        </InputWrapper>

        <InputWrapper
          label="Minimal price (in usd)"
          error={errors.price?.message}
        >
          <Input
            {...register("price")}
            className="bg-slate-50"
            placeholder="Specify minimal price of the thing"
          />
        </InputWrapper>
        <InputWrapper
          label="Auction description"
          error={errors.description?.message}
        >
          <Textarea
            {...register("description")}
            className="bg-slate-50"
            placeholder="Describe your product"
          />
        </InputWrapper>

        <InputWrapper label="Auction end date" error={errors.endsAt?.message}>
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
      </section>
      <section className="flex flex-col gap-6 rounded-[32px] bg-white px-[80px] py-[40px]">
        <div>
          <h2 className="text-2xl font-bold">Photos</h2>
          <p>The first photo is going to be tha main photo</p>
        </div>

        <PhotoInputField />

        <Button type="submit" className="self-start">
          {actionName}
        </Button>
      </section>
    </form>
  );
};
export { AuctionForm };
