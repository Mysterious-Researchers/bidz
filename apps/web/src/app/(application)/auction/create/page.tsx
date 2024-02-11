"use client";
import {
  AuctionForm,
  type AuctionFormProps,
} from "@/app/(application)/auction/_components/auction-form";
import AuctionApi from "@/lib/api/auction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleAuctionCreate: AuctionFormProps["onSubmit"] = async (data) => {
    await AuctionApi.create(data);
    toast.success("Auction created successfully");
    router.push("/");
  };

  return (
    <div className="px-20 py-[80px] lg:px-80">
      <h2 className="mb-2 text-2xl font-bold">Create your auction</h2>
      <AuctionForm
        actionName={"Create an auction"}
        onSubmit={handleAuctionCreate}
      />
    </div>
  );
}
