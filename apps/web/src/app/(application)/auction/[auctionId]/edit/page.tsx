import { AuctionForm } from "@/app/(application)/auction/_components/auction-form";

export default function AuctionEditPage({
  params: { auctionId },
}: {
  params: { auctionId: string };
}) {
  // TODO: fetch an auction by id from the api and put it in the dafault values

  return (
    <div className="px-20 py-[80px] lg:px-80">
      <h2 className="mb-2 text-2xl font-bold">Edit your auction</h2>
      <AuctionForm actionName={"Save"} />
    </div>
  );
}
