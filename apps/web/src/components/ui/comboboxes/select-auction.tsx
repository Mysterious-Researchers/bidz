"use client";
import { Badge } from "@/components/ui/badge";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
    value: "price",
  },

  {
    label: "By Popularity",
    value: "popularity",
  },
];

function AuctionCombobox() {
  const [open, setOpen] = React.useState(false);
  const [selectedCategories, setSelectedCategories] =
    React.useState<TComboboxOption[]>(auctionCategories);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateSearchParams = (categories: TComboboxOption[]) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    let search = "";

    if (categories.length === 0) {
      current.delete("categories");
    } else {
      categories.forEach((category, index) => {
        search += `categories=${category.value}${index !== categories.length - 1 ? "&" : ""}`;
      });
    }

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
          className="h-fit w-[200px] pb-0 pt-4"
        >
          <ScrollArea className="absolute flex h-[35px] gap-4">
            {selectedCategories.map((category) => (
              <Badge key={category.value}>{category.label}</Badge>
            ))}
            {selectedCategories.length === 0 && (
              <p className="flex items-center gap-2 text-lg">
                <Icons.ArrowUpDown />
                Sort auctions
              </p>
            )}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {auctionCategories.map((category) => (
              <CommandItem
                key={category.label}
                value={category.value}
                onSelect={(currentValue) => {
                  setSelectedCategories((current) => {
                    const isCategorySelected = current.some(({ value }) => {
                      return value === category.value;
                    });

                    let newCategories = [];
                    if (isCategorySelected) {
                      newCategories = current.filter(
                        ({ value }) => value !== category.value,
                      );
                    } else {
                      newCategories = [...current, category];
                    }
                    updateSearchParams(newCategories);
                    return newCategories;
                  });
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCategories.some(
                      ({ value }) => category.value === value,
                    )
                      ? "opacity-100"
                      : "opacity-0",
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
