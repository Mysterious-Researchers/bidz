"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  onSelect,
}: {
  date?: Date;
  onSelect: (date: Date) => void;
}) {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setPopoverOpen((prev) => !prev)}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start bg-slate-50 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setPopoverOpen(false);
            onSelect(date!);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
