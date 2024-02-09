"use client";
import { useForm } from "react-hook-form";
import { type TSignupInput, signupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWrapper, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const defaultValues: TSignupInput = {
  email: "",
  password: "",
  nickname: "",
  confirmPassword: "",
};
function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = (data: TSignupInput) => {
    //TOOO: bind to the api
    console.log(data);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <section>
        <h2 className="text-[30px] font-bold">Sign up</h2>
        <p className="text-[16px]">
          Create your account and start getting bang for the buck
        </p>
      </section>

      <InputWrapper label={"Nickname"} error={errors.nickname?.message}>
        <Input {...register("nickname")} className="w-[380px]" />
      </InputWrapper>
      <InputWrapper label={"Email"} error={errors.email?.message}>
        <Input {...register("email")} className="w-[380px]" />
      </InputWrapper>
      <InputWrapper
        label={"Enter your password"}
        error={errors.password?.message}
      >
        <Input
          {...register("password")}
          className="w-[380px]"
          type="password"
        />
      </InputWrapper>

      <InputWrapper
        label={"Confirm your password"}
        error={errors.confirmPassword?.message}
      >
        <Input
          {...register("confirmPassword")}
          className="w-[380px]"
          type="password"
        />
      </InputWrapper>
      <Button>Sign me up</Button>
    </form>
  );
}

export { SignupForm };
