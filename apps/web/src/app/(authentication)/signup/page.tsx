import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignupForm } from "@/app/(authentication)/signup/_components/signup-form";

export default function SignUpPage({}) {
  return (
    <main className="flex min-h-[calc(100vh-480px)] flex-1 flex-col items-center justify-between">
      <Link href={"/login"} className="self-end">
        <Button variant="ghost">Log in</Button>
      </Link>
      <SignupForm />
      <div></div>
    </main>
  );
}
