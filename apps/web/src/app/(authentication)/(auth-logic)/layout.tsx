import * as React from "react";
import Image from "next/image";
import Link from "next/link";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh] w-full">
      <section className="flex hidden flex-1 flex-col justify-between bg-black p-6 px-[40px] py-[80px] lg:flex">
        <Link href="/">
          <Image
            src="/logo-white.svg"
            alt="logo"
            width={100}
            height={50}
          ></Image>
        </Link>
        <p className="text-white">BIDZ - a simple bidding application.</p>
      </section>
      <section className="space flex w-[100%] min-w-[450px] flex-1 flex-col justify-between py-8 pl-8 pr-6 align-middle lg:max-w-[840px]">
        {children}
      </section>
    </div>
  );
}
