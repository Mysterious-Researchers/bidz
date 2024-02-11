"use client";
import {
  AuctionForm,
  type AuctionFormProps,
} from "@/app/(application)/auction/_components/auction-form";
import AuctionApi from "@/lib/api/auction";

export default function Page({
  params: { auctionId },
}: {
  params: { auctionId: string };
}) {
  const handleAuctionEdit: AuctionFormProps["onSubmit"] = async (data) => {
    await AuctionApi.edit(data, auctionId);
  };

  return (
    <div className="px-20 py-[80px] lg:px-80">
      <h2 className="mb-2 text-2xl font-bold">Create your auction</h2>
      <AuctionForm
        actionName={"Edit an auction"}
        onSubmit={handleAuctionEdit}
      />
    </div>
  );
}
