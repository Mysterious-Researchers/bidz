import AuctionApi from "@/lib/api/auction";
export default async function SingleAuctionPage({
  params: { auctionId },
}: {
  params: { auctionId: string };
}) {
  //TODO: add api
  const auction = await AuctionApi.getAuctionById(auctionId);

  return (
    <div>
      {JSON.stringify(auction)}
      <h1>SingleAuctionPage</h1>
    </div>
  );
}
