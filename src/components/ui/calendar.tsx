
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, SelectSingleEventHandler } from "react-day-picker"
import { fr } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  onResetClick?: () => void;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onResetClick,
  ...props
}: CalendarProps) {
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onResetClick) {
      onResetClick();
    } else if (props.mode === "single" && props.onSelect) {
      // Use type assertion to access onSelect property safely
      const onSelect = props.onSelect as SelectSingleEventHandler;
      onSelect(undefined);
    }
  };

  const handleToday = (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.mode === "single" && props.onSelect) {
      // Use type assertion to access onSelect property safely
      const onSelect = props.onSelect as SelectSingleEventHandler;
      onSelect(new Date());
    }
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto bg-white dark:bg-gray-950", className)}
      locale={fr}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      footer={
        <div className="rdp-footer flex justify-between p-2 border-t border-gray-200 dark:border-gray-700 mt-2">
          <button 
            onClick={handleReset}
            className="text-sm text-primary hover:underline"
          >
            Effacer
          </button>
          <button 
            onClick={handleToday}
            className="text-sm text-primary hover:underline"
          >
            Aujourd'hui
          </button>
        </div>
      }
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
