"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AuctionCombobox } from "@/components/ui/comboboxes/select-auction";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface SearchComponentProps {
  defaultSearchValue?: string;
}
function SearchComponent({ defaultSearchValue }: SearchComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(defaultSearchValue);
  const updateSearchParams = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!value) {
      current.delete("search");
    } else {
      current.set("search", value);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  const handleInputChangeDebounced = useDebouncedCallback((value: string) => {
    setInputValue(value);
    updateSearchParams(value);
  }, 300);

  return (
    <div className="mb-4 flex items-center justify-between">
      <Input
        placeholder="Search for an auction"
        className="h-[50px] w-full text-[16px] md:max-w-[50%] lg:max-w-[30%]"
        defaultValue={defaultSearchValue}
        onChange={(event) => handleInputChangeDebounced(event.target.value)}
      />
      <AuctionCombobox />
    </div>
  );
}

export { SearchComponent };
