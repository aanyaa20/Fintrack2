import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import PageLayout from "@/components/page-layout";
import ScheduleReportDrawer from "./_component/schedule-report-drawer";
import ReportTable from "./_component/report-table";


export default function Reports() {
  const { t } = useTranslation();
 
  return (
    <PageLayout
      title={t("reports.title")}
      subtitle={t("reports.subtitle")}
      addMarginTop
      rightAction={
        <ScheduleReportDrawer />
      }
    >
        <Card className="border shadow-none">
          <CardContent>
           <ReportTable />
          </CardContent>
        </Card>
    </PageLayout>
  );
}