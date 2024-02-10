import { SearchComponent } from "@/app/(application)/_components/auction-search";
import { AuctionList } from "@/app/(application)/_components/auction-list";
import AuctionApi from "@/lib/api/auction";
import { possibleCategories, type TCategory } from "@/lib/api/auction";

export default async function HomePage({
  searchParams: { search, _categories },
}: {
  params: never;
  searchParams: {
    search: string;
    _categories: TCategory[] | TCategory;
  };
}) {
  let categories;
  if (!Array.isArray(_categories)) {
    categories = [_categories];
  } else categories = _categories;

  categories = categories.filter((category) =>
    possibleCategories.includes(category),
  );

  const auctions = await AuctionApi.getListOfAuctions(search, categories);

  return (
    <main className="flex min-h-[calc(100vh-480px)] flex-1 flex-col px-[80px] py-[80px]">
      <SearchComponent defaultSearchValue={search} />
      <AuctionList auctions={auctions} />
    </main>
  );
}
