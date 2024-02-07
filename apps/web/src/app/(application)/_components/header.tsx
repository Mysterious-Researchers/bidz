import { Button } from "@/components/ui/button";
import Image from "next/image";
function Header() {
  return (
    <header className="flex h-[80px] w-full justify-around">
      <Image src="/logo.svg" alt="logo" width={100} height={30} />
      <div className="flex items-center justify-between gap-8">
        <nav className="flex items-center">
          <ul className="flex justify-between gap-2">
            <li>
              <Button variant="underline" className="uppercase">
                auctions
              </Button>
            </li>
            <li>
              <Button variant="underline" className="uppercase">
                create an auction
              </Button>
            </li>
          </ul>
        </nav>
        <Button>Join our community</Button>
      </div>
    </header>
  );
}

export { Header };
