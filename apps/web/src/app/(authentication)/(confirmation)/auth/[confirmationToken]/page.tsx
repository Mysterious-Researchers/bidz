"use client";
import { useQuery } from "@tanstack/react-query";
import { Icons } from "@/components/icons";
import {
  SuccessAlert,
  FailureAlert,
} from "@/app/(authentication)/(confirmation)/auth/[confirmationToken]/_components/alerts";
import AuthApi from "@/lib/api/auth";
export default function ConfirmEmailPage({
  params: { confirmationToken },
}: {
  params: { confirmationToken: string };
}) {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => AuthApi.verifyEmailAndSaveAuthTokens(confirmationToken),
  });

  if (isPending) return <Icons.Loader className="h-24 w-24 animate-spin" />;
  if (data) return <SuccessAlert />;
  if (error) return <FailureAlert />;
}
