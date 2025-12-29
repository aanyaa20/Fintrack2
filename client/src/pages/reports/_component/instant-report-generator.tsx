import { Button } from "@/components/ui/button";
import { Download, FileText, Loader } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, subDays, subMonths, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { toast } from "sonner";
import { Env } from "@/config/env.config";
import { useTypedSelector } from "@/app/hook";

const InstantReportGenerator = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [isGenerating, setIsGenerating] = useState(false);
  const { accessToken } = useTypedSelector((state) => state.auth);

  const getDateRange = (period: string) => {
    const now = new Date();
    let from: Date;
    let to: Date = now;

    switch (period) {
      case "last7days":
        from = subDays(now, 7);
        break;
      case "last30days":
        from = subDays(now, 30);
        break;
      case "lastMonth":
        from = startOfMonth(subMonths(now, 1));
        to = endOfMonth(subMonths(now, 1));
        break;
      case "thisMonth":
        from = startOfMonth(now);
        break;
      case "thisYear":
        from = startOfYear(now);
        to = endOfYear(now);
        break;
      default:
        from = subDays(now, 30);
    }

    return {
      from: from.toISOString(),
      to: to.toISOString(),
    };
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const { from, to } = getDateRange(selectedPeriod);
      
      const url = `${Env.API_URL}/report/generate-pdf?from=${from}&to=${to}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate report');
      }

      // Get the blob from response
      const blob = await response.blob();
      
      // Create a download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `financial-report-${format(new Date(from), 'yyyy-MM-dd')}-to-${format(new Date(to), 'yyyy-MM-dd')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('Report downloaded successfully!');
    } catch (error: any) {
      console.error('Error generating report:', error);
      toast.error(error.message || 'Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-4 px-4 py-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold mb-1">Generate Instant Report</h3>
          <p className="text-sm text-muted-foreground">
            Download a comprehensive financial report for any time period instantly
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Period</label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="w-full text-white"
        >
          {isGenerating ? (
            <>
              <Loader className="h-4 w-4 animate-spin mr-2" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF Report
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Report includes income, expenses, top categories, and AI-powered insights
        </p>
      </div>
    </div>
  );
};

export default InstantReportGenerator;
