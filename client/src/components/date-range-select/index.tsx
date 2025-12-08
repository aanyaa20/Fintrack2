import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  format,
  subDays,
  subMonths,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  endOfDay,
} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export const DateRangeEnum = {
  LAST_30_DAYS: "30days",
  LAST_MONTH: "lastMonth",
  LAST_3_MONTHS: "last3Months",
  LAST_YEAR: "lastYear",
  THIS_MONTH: "thisMonth",
  THIS_YEAR: "thisYear",
  ALL_TIME: "allTime",
  CUSTOM: "custom",
} as const;

export type DateRangeEnumType =
  (typeof DateRangeEnum)[keyof typeof DateRangeEnum];

export type DateRangeType = {
  from: Date | null;
  to: Date | null;
  value?: string;
  label: string;
} | null;

type DateRangePreset = {
  label: string;
  value: string;
  getRange: () => DateRangeType;
};

interface DateRangeSelectProps {
  dateRange: DateRangeType;
  setDateRange: (range: DateRangeType) => void;
  defaultRange?: DateRangeEnumType;
}

const now = new Date();
const today = endOfDay(now);

export const DateRangeSelect = ({
  dateRange,
  setDateRange,
  defaultRange = DateRangeEnum.LAST_30_DAYS,
}: DateRangeSelectProps) => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const presets: DateRangePreset[] = [
    {
      label: t("dashboard.last_30_days"),
      value: DateRangeEnum.LAST_30_DAYS,
      getRange: () => ({
        from: subDays(today, 29),
        to: today,
        value: DateRangeEnum.LAST_30_DAYS,
        label: t("dashboard.for_past") + " 30 " + t("dateRange.days"),
      }),
    },
    {
      label: t("dashboard.last_month"),
      value: DateRangeEnum.LAST_MONTH,
      getRange: () => ({
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
        value: DateRangeEnum.LAST_MONTH,
        label: t("dashboard.for_past") + " " + t("dateRange.month"),
      }),
    },
    {
      label: t("dashboard.last_90_days"),
      value: DateRangeEnum.LAST_3_MONTHS,
      getRange: () => ({
        from: startOfMonth(subMonths(today, 3)),
        to: today,
        value: DateRangeEnum.LAST_3_MONTHS,
        label: t("dashboard.for_past") + " 3 " + t("dateRange.months"),
      }),
    },
    {
      label: t("dateRange.last_year"),
      value: DateRangeEnum.LAST_YEAR,
      getRange: () => ({
        from: startOfYear(subYears(today, 1)),
        to: endOfYear(subYears(today, 1)),
        value: DateRangeEnum.LAST_YEAR,
        label: t("dashboard.for_past") + " " + t("dateRange.year"),
      }),
    },
    {
      label: t("dashboard.this_month"),
      value: DateRangeEnum.THIS_MONTH,
      getRange: () => ({
        from: startOfMonth(today),
        to: today,
        value: DateRangeEnum.THIS_MONTH,
        label: t("dateRange.for_this_month"),
      }),
    },
    {
      label: t("dashboard.this_year"),
      value: DateRangeEnum.THIS_YEAR,
      getRange: () => ({
        from: startOfYear(today),
        to: today,
        value: DateRangeEnum.THIS_YEAR,
        label: t("dateRange.for_this_year"),
      }),
    },
    {
      label: t("dashboard.all_time"),
      value: DateRangeEnum.ALL_TIME,
      getRange: () => ({
        from: null,
        to: null,
        value: DateRangeEnum.ALL_TIME,
        label: t("dateRange.across_all_time"),
      }),
    },
  ];

  const displayText = dateRange
    ? presets.find((p) => p.value === dateRange.value)?.label ||
      (dateRange.from
        ? `${format(dateRange.from, "MMM dd, y")} - ${
            dateRange.to ? format(dateRange.to, "MMM dd, y") : "Present"
          }`
        : "Select a duration")
    : "Select a duration";

  // Set default range on initial render
  useEffect(() => {
    if (!dateRange) {
      const defaultPreset = presets.find((p) => p.value === defaultRange);
      if (defaultPreset) {
        setDateRange(defaultPreset.getRange());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, defaultRange, setDateRange]);

  // Update dateRange label when language changes
  useEffect(() => {
    if (dateRange?.value) {
      const currentPreset = presets.find((p) => p.value === dateRange.value);
      if (currentPreset) {
        const updatedRange = currentPreset.getRange();
        if (updatedRange && updatedRange.label !== dateRange.label) {
          setDateRange(updatedRange);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            `w-[200px] h-10 px-4 py-2 flex items-center justify-between text-left font-normal bg-[var(--secondary-dark-color)]
            border border-gray-700 text-white cursor-pointer hover:bg-gray-700 hover:border-gray-600 rounded-md text-sm`,
            !dateRange && "text-muted-foreground"
          )}
        >
          {displayText}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50" align="start">
        <div className="grid py-1">
          {presets.map((preset) => (
            <Button
              key={preset.value}
              variant="ghost"
              className={cn(
                "justify-start text-left",
                dateRange?.value === preset.value && "bg-accent"
              )}
              onClick={() => {
                setDateRange(preset.getRange());
                setOpen(false);
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};