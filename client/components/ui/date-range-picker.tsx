"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { cn } from "@/lib/utils"

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onDateChange?: (date: DateRange | undefined) => void;
  value: {from: Date, to: Date},
  error?: string| null | undefined;
}

export function CalendarDateRangePicker({
  className,
  onDateChange,
  value,
  error
}: CalendarDateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value)

  React.useEffect(()=>{
    if(onDateChange) onDateChange(date);
  },[date])

  return (
    <div className={cn("grid gap-2", className)}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start px-3 py-2 h-[45px] text-left font-normal rounded-none",
            !date && "text-muted-foreground",
            error && 'focus-visible:ring-red-500'
          )}
        >
          <CalendarIcon className="mr-2 h-5 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          disabled={{before: new Date()}}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  </div>
  )
}