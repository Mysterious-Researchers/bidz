import { AuctionForm } from "@/app/(application)/auction/create/_componets/auction-form";

export default function Page() {
  return (
    <div className="px-20 py-[80px] lg:px-80">
      <h2 className="mb-2 text-2xl font-bold">Create your auction</h2>
      <AuctionForm actionName={"Create an auction"} />
    </div>
  );
}
