"use client";
import AuctionApi, {TAuctionsListItem} from "@/lib/api/auction";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
export default function SingleAuctionPage({
                                            params: { auctionId },
                                          }: {
  params: { auctionId: string };
}) {const [auction, setAuction] = useState<TAuctionsListItem>();
  const [current, setCurrent] = useState(300);
  useEffect(() => {
    const getAuction = async () => {
      const response = await AuctionApi.getAuctionById(auctionId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setAuction(response.data);
    }
    getAuction();
  }, []);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const handleSubmit = (formData) => {
    const value = +formData.get("Your bid");
    setCurrent(value);
  }
  if (!auction) return <div>Loading...</div>
  return (
    <div style={{margin: '30px'}}>
      <h1 className="text-3xl" style={{paddingBottom: '30px'}}>{auction.name}</h1>
      <h3 className="font-bold">{`Current bid: ${current}$`}</h3>
      <form action={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <input className="w-[380px] h-[40px]" style={{borderRadius: '8px', border:'1px solid #000'}} name="Your bid"/>
        <Button className="w-[90px]" style={{ marginTop: '10px' }}> Raise bid</Button>
      </form>
    </div>
  );
}
