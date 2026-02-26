import React from "react";
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

// Assuming these props come from your EventForm
interface DatePickerProps {
  value: string; // The date string from Inertia data
  onChange: (date: Date | undefined) => void;
  label: string;
  error?: string;
}

export function DatePicker({ value, onChange, label, error }: DatePickerProps) {
  // Convert string from data to Date object for the Calendar component
  const selectedDate = value ? new Date(value) : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}