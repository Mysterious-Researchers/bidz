"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { navItems } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
export const OpenMobileHeaderButtonAndMobileHeader = ({}) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({
            variant: "ghost",
            className: "block md:hidden",
          }),
          "md:hidden",
        )}
      >
        <Icons.Menu />
      </SheetTrigger>
      <SheetContent>
        <nav className="flex flex-col items-start gap-4">
          <ul className="flex flex-col gap-2">
            {navItems.map(({ href, title }) => (
              <SheetClose asChild key={href}>
                <Link href={href}>
                  <Button
                    variant={
                      pathname === href ? "underline-active" : "underline"
                    }
                    className="uppercase"
                  >
                    {title}
                  </Button>
                </Link>
              </SheetClose>
            ))}
          </ul>

          <SheetClose>
            <Link href={"/login"}>
              <Button>Join our community</Button>
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
