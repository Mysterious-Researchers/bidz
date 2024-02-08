import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { navItems } from "@/config/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="flex w-full flex-col gap-[32px] bg-black p-5 px-20 py-[40px] text-white lg:px-80">
      <div className="flex w-full flex-wrap justify-between">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex flex-col flex-wrap gap-3">
            <Link href={"/"} className="flex">
              <Image src="/logo-white.svg" alt="logo" width={100} height={30} />
            </Link>
            <p>A simple bidding application</p>
            <div className="flex items-center gap-3">
              <Link href="https://www.instagram.com/">
                <Icons.SocialMedia.Instagram width={24} height={20} />
              </Link>

              <Link href="https://youtube.com/">
                <Icons.SocialMedia.Youtube width={24} height={24} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">Menu</h3>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">Subscribe to a newsletter</h3>
          <div className="flex gap-2">
            <Input className="text-black"></Input>
            <Button variant="blue">Subscribe</Button>
          </div>
        </div>
      </div>
      <hr />
      <p className="text-center">© Copyright 2024. Made with ❤️</p>
    </footer>
  );
}

export { Footer };
