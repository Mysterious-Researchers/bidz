import { Button } from "@/components/ui/button";
import Image from "next/image";
import { navItems } from "@/config/navigation";
import { NavItem } from "@/app/(application)/_components/navigation/nav-item";
import Link from "next/link";
import { OpenMobileHeaderButtonAndMobileHeader } from "@/app/(application)/_components/navigation/header-mobile";

function Header() {
  return (
    <header className="flex min-h-[80px] w-full flex-wrap items-center justify-around">
      <Link href={"/"} className="flex">
        <Image src="/logo-blue.svg" alt="logo" width={100} height={30} />
      </Link>
      <div className="hidden flex-wrap items-center justify-between gap-8 md:flex">
        <nav className="flex items-center">
          <ul className="flex flex-wrap justify-between gap-2 ">
            {navItems.map(({ title, href }) => (
              <NavItem href={href} key={href}>
                {title}
              </NavItem>
            ))}
          </ul>
        </nav>
        <Button>Join our community</Button>
      </div>

      <OpenMobileHeaderButtonAndMobileHeader />
    </header>
  );
}

export { Header };
