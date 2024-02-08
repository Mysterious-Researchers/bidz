"use client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function NavItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <li className="list-none">
      <Link href={href}>
        <Button
          variant={pathname === href ? "underline-active" : "underline"}
          className="uppercase"
        >
          {children}
        </Button>
      </Link>
    </li>
  );
}

export { NavItem };
