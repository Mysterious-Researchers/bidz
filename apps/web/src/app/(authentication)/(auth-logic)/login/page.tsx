import { LoginForm } from "@/app/(authentication)/(auth-logic)/login/_components/login-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-[calc(100vh-480px)] flex-1 flex-col items-center justify-between">
      <Link href={"/signup"} className="self-end">
        <Button variant="ghost">Sign up</Button>
      </Link>
      <LoginForm />
      <div></div>
    </main>
  );
}
