"use client";
import type { TAuctionsListItem } from "@/lib/api/auction";
import { Icons } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
interface ProjectCardProps {
  auction: TAuctionsListItem;
}
const AuctionCard = ({ auction }: ProjectCardProps) => {
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
      <Carousel setApi={setApi} className="relative overflow-hidden rounded-xl">
        <CarouselContent>
          {auction.photos.map((image) => (
            <CarouselItem key={image}>
              <img
                src={image}
                alt={auction.title}
                className="aspect-[2/1.3] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex h-[20px] items-center justify-center gap-1 bg-sky-950">
          {auction.photos.map((photo, index) => (
            <div
              className={`h-[8px] w-[8px] cursor-pointer rounded ${index === current - 1 ? "bg-white" : "bg-[#667E8F]"}`}
              key={photo}
              onClick={() => handleCircleSelected(index)}
            ></div>
          ))}
        </div>
        <CarouselPrevious className="absolute left-[12px]" />
        <CarouselNext className="absolute right-[12px]" />
      </Carousel>
      <div className="mt-8 flex flex-col gap-4">
        <CardTitle className="text-3xl">{auction.title}</CardTitle>
        <CardDescription>{auction.description}</CardDescription>
        <div className="flex justify-between">
          <h3>Current price ($)</h3>
          <span>1212</span>
        </div>

        <div className="flex justify-between">
          <h3>Active bidders</h3>
          <span>12</span>
        </div>
      </div>
    </Card>
  );
};

export { AuctionCard };
