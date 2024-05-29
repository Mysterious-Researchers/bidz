"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, InputWrapper } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { type TAuctionInput, auctionSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhotoInputField } from "@/app/(application)/auction/_components/photo-input";

const initialAuctionValues: TAuctionInput = {
  name: "",
  endDate: new Date(),
  startPrice: 0,
  stepPrice: 1,
  description: "",
};

interface AuctionFormProps {
  defaultValues?: TAuctionInput;
  actionName: string;
  onSubmit: (data: TAuctionInput) => Promise<void>;
}
const AuctionForm = ({
  defaultValues,
  actionName,
  onSubmit,
}: AuctionFormProps) => {
  defaultValues = defaultValues ?? initialAuctionValues;

  const {
    getValues,
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues, resolver: zodResolver(auctionSchema) });

  const [date, setDate] = React.useState<Date | undefined>(
    defaultValues?.endDate,
  );
  console.log(getValues())

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="mb-[20px] flex flex-col gap-4 rounded-[32px] bg-white px-[80px] py-[40px]">
        <InputWrapper label="Auction title" error={errors.name?.message}>
          <Input
            {...register("name")}
            className="bg-slate-50"
            placeholder="Specify what you are selling"
          />
        </InputWrapper>

        <InputWrapper
          label="Minimal price (in usd)"
          error={errors.startPrice?.message}
        >
          <Input
            {...register("startPrice")}
            className="bg-slate-50"
            placeholder="Specify minimal price of the thing"
          />
        </InputWrapper>

        <InputWrapper
          label="Step price (in usd)"
          error={errors.stepPrice?.message}
        >
          <Input
            {...register("stepPrice")}
            className="bg-slate-50"
            placeholder="Specify a minimal step price of the thing"
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

        <InputWrapper label="Auction end date" error={errors.endDate?.message}>
          <Controller
            name={"endDate"}
            control={control}
            render={() => (
              <DatePicker
                date={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setValue("endDate", newDate, { shouldValidate: true });
                }}
              />
            )}
          />
        </InputWrapper>
      </section>
      <section className="flex flex-col gap-6 rounded-[32px] bg-white px-[80px] py-[40px]">
        <div>
          <h2 className="text-2xl font-bold">Photos</h2>
        </div>

        {/*<InputWrapper*/}
        {/*  label={"The first photo is going to be tha main photo"}*/}
        {/*  error={errors.photos?.message}*/}
        {/*>*/}
        {/*  <PhotoInputField*/}
        {/*    photos={watchPhotos}*/}
        {/*    onPhotoDelete={(photoToDeleteUrl) => {*/}
        {/*      const allPhotos = getValues("photos");*/}
        {/*      setValue(*/}
        {/*        "photos",*/}
        {/*        allPhotos.filter(({ link }) => link !== photoToDeleteUrl),*/}
        {/*      );*/}
        {/*    }}*/}
        {/*    onPhotoAdd={(photoObj) => {*/}
        {/*      setValue("photos", [...getValues("photos"), photoObj]);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</InputWrapper>*/}
        <Button type="submit" className="self-start">
          {actionName}
        </Button>
      </section>
    </form>
  );
};

export { AuctionForm };
export type { AuctionFormProps };
