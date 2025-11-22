import { useTypedSelector } from "@/app/hook";
import { useTranslation } from "react-i18next";
import DashboardHeader from "./_component/dashboard-header";
import DashboardStats from "./_component/dashboard-stats";
import { DateRangeType } from "@/components/date-range-select";

const DashboardSummary = ({
  dateRange,
  setDateRange,
}: {
  dateRange?: DateRangeType;
  setDateRange?: (range: DateRangeType) => void;
}) => {
  const { user } = useTypedSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <DashboardHeader
        title={`${t("dashboard.welcome")}, ${user?.name || "Unknown"}`}
        subtitle={t("dashboard.overview_report")}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <DashboardStats dateRange={dateRange} />
    </div>
  );
};

export default DashboardSummary;