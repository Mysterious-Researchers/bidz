"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { type TCategory } from "@/lib/api/auction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TComboboxOption = { label: string; value: TCategory };

const auctionCategories: TComboboxOption[] = [
  {
    label: "By Name",
    value: "name",
  },

  {
    label: "By Price",
    value: "currentPrice",
  },

  {
    label: "By Popularity",
    value: "bids",
  },
];

function AuctionCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("name");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = (category?: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!category) {
      current.delete("category");
    } else {
      current.set("category", category);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? auctionCategories.find((category) => category.value === value)
                ?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {auctionCategories.map((category) => (
              <CommandItem
                key={category.value}
                value={category.value}
                onSelect={(_) => {
                  setValue(category.value === value ? "" : category.value);
                  setOpen(false);
                  updateSearchParams(category.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === category.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {category.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export { AuctionCombobox };
