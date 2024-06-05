"use client";
import type { TAuctionsListItem } from "@/lib/api/auction";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
} from "@/components/ui/carousel";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
interface ProjectCardProps {
  auction: TAuctionsListItem;
  link: string;
}
const AuctionCard = ({ auction, link}: ProjectCardProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleCircleSelected(index: number) {
    if (!api) {
      return;
    }

    api.scrollTo(index);
  }

  return (
    <Card className="p-[20px]">
      <div className="mt-8 flex flex-col gap-4">
        <CardTitle className="text-3xl">{auction.name}</CardTitle>
        <CardDescription>{auction.description}</CardDescription>
        <div className="flex justify-between">
          <h3 className="font-bold">Current price ($)</h3>
          <span>{auction.currentPrice}</span>
        </div>

        <div className="flex justify-between">
          <h3 className="font-bold">Active bidders</h3>
          <span>12</span>
        </div>

        <Link href={link}>
          <Button>Join bidding session</Button>
        </Link>
      </div>
    </Card>
  );
};

export { AuctionCard };
