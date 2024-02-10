import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function SuccessAlert() {
  return (
    <Alert className="flex flex-col gap-4">
      <AlertTitle className="text-2xl font-bold">Success</AlertTitle>
      <AlertDescription>
        Your account has been successfully activated
      </AlertDescription>
      <Link href={"/login"}>
        <Button>Log in</Button>
      </Link>
    </Alert>
  );
}

function FailureAlert() {
  return (
    <Alert className="flex flex-col gap-4">
      <AlertTitle className="text-2xl font-bold">Failure</AlertTitle>
      <AlertDescription>
        Something went wrong while activating your account, contact support
      </AlertDescription>
      <Link href={"/"}>
        <Button>Go to the main page</Button>
      </Link>
    </Alert>
  );
}

export { SuccessAlert, FailureAlert };
