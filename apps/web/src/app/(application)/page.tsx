import { SearchComponent } from "@/app/(application)/_components/auction-search";
import { AuctionList } from "@/app/(application)/_components/auction-list";
import AuctionApi from "@/lib/api/auction";
import { possibleCategories, type TCategory } from "@/lib/api/auction";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams: { search, category },
}: {
  params: never;
  searchParams: {
    search: string;
    category?: TCategory;
  };
}) {
  const response = await AuctionApi.getAllAuctions(search, category);

  console.log(response.data);

  return (
    <main className="flex min-h-[calc(100vh-480px)] flex-1 flex-col px-[80px] py-[80px]">
      <SearchComponent defaultSearchValue={search} />
      <AuctionList auctions={response.data} />
    </main>
  );
}
