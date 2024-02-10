import AuthApi from "@/lib/api/auth";
import {
  SuccessAlert,
  FailureAlert,
} from "@/app/(authentication)/(confirmation)/auth/[confirmationToken]/_components/alerts";

export default async function ConfirmEmailPage({
  params: { confirmationToken },
}: {
  params: { confirmationToken: string };
}) {
  try {
    console.log("token", confirmationToken);
    await AuthApi.verifyEmail(confirmationToken);
    return <SuccessAlert />;
  } catch (error) {
    return <FailureAlert />;
  }
}
