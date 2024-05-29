"use client";
import AuctionApi from "@/lib/api/auction";
import {useEffect, useState} from "react";
import {AuctionCard} from "@/app/(application)/_components/auction-card";
export default function SingleAuctionPage({
  params: { auctionId },
}: {
  params: { auctionId: string };
}) {const [auction, setAuction] = useState();
  console.log(auctionId);
  useEffect(() => {
    const getAuction = async () => {
      const response = await AuctionApi.getAuctionById(auctionId);
      console.log(response)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setAuction(response.data);
    }
    getAuction();
  }, []);
  if (!auction) return <div>Loading...</div>
  return (
    <div>
      <AuctionCard auction={auction}/>
    </div>
  );
}
