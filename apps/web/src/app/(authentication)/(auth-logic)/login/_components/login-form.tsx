"use client";
import { useForm } from "react-hook-form";
import { type TLoginInput, loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWrapper, Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthApi from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const defaultValues: TLoginInput = {
  email: "",
  password: "",
};
function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: TLoginInput) => {
    try {
      await AuthApi.login(data);
      router.push("/");
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <section>
        <h2 className="text-[30px] font-bold">Log in</h2>
        <p className="text-[16px]">
          Welcome back to the best bidding application
        </p>
      </section>
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
      <Button>Log me in</Button>
    </form>
  );
}

export { LoginForm };
