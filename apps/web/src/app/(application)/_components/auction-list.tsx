import { AuctionCard } from "./auction-card";
import { type TAuctionsListItem } from "@/lib/api/auction";
interface AuctionListProps {
  auctions: TAuctionsListItem[];
}
function AuctionList({ auctions }: AuctionListProps) {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {auctions.map((auction) => (
        <AuctionCard auction={auction} key={auction.title} />
      ))}
    </ul>
  );
}

export { AuctionList };
