"use client";
import {
  AuctionForm,
  type AuctionFormProps,
} from "@/app/(application)/auction/_components/auction-form";
import AuctionApi from "@/lib/api/auction";
import AuthApi from "@/lib/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {type TAuthEndpoints} from "../../../../../../../libs/types";
import {useEffect, useState} from "react";

interface formData {
  name: string,
  startPrice: number,
  stepPrice: number,
  endDate: Date,
  description: string
}

const createAuctionBody = (data: formData, user: TAuthEndpoints["getUser"] | undefined) => {
  return {
    name: data.name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userId: user.id,
    startPrice: data.startPrice,
    stepPrice: data.stepPrice,
    currentPrice: data.startPrice,
    endDate: data.endDate,
    description: data.description,
  }
}
export default function Page() {
  const [user, setUser] = useState<TAuthEndpoints["getUser"]>();
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      const response = await AuthApi.getMe()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setUser(response);
    }

    getUser()
  }, []);
  const handleAuctionCreate: AuctionFormProps["onSubmit"] = async (data) => {
    const auctionData = createAuctionBody(data, user);
    await AuctionApi.create(auctionData);
    toast.success("Auction created successfully");
    router.push("/");
  };

  return (
    <div className="px-20 py-[80px] lg:px-80">
      <h2 className="mb-2 text-2xl font-bold">Create your auction</h2>
      <AuctionForm
        actionName={"Create an auction"}
        onSubmit={handleAuctionCreate}
      />
    </div>
  );
}
