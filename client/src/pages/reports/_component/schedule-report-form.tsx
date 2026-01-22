import { Button } from "@/components/ui/button";
import { Loader, Mail, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useTypedSelector } from "@/app/hook";
import { useUpdateReportSettingMutation } from "@/features/report/reportAPI";
import { updateCredentials } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import InstantReportGenerator from "./instant-report-generator";
import { format } from "date-fns";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  frequency: z.enum(["DAILY", "WEEKLY", "BI_WEEKLY", "MONTHLY"]),
  isEnabled: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const ScheduleReportForm = ({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { user, reportSetting } = useTypedSelector((state) => state.auth);
  const [nextReportDate, setNextReportDate] = useState<string | null>(null);

  const [updateReportSetting, { isLoading }] = useUpdateReportSettingMutation();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      isEnabled: true,
      frequency: "DAILY",
    },
  });

  useEffect(() => {
    if (user && reportSetting) {
      form.reset({
        email: reportSetting?.email || user?.email,
        isEnabled: reportSetting?.isEnabled,
        frequency: (reportSetting?.frequency as "DAILY" | "WEEKLY" | "BI_WEEKLY" | "MONTHLY") || "DAILY",
      });
      
      // Set the next report date if it exists
      if (reportSetting?.nextReportDate) {
        setNextReportDate(reportSetting.nextReportDate);
      }
    }
  }, [user, form, reportSetting]);

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const payload = { 
      isEnabled: values.isEnabled,
      frequency: values.frequency,
      email: values.email
    };
    updateReportSetting(payload)
      .unwrap()
      .then((response) => {
        // Update local state with the new report setting including nextReportDate
        const updatedSetting = {
          ...payload,
          nextReportDate: response.reportSetting.nextReportDate,
          lastSentDate: response.reportSetting.lastSentDate,
        };
        
        dispatch(updateCredentials({ reportSetting: updatedSetting }));
        
        // Update local nextReportDate state
        if (response.reportSetting.nextReportDate) {
          setNextReportDate(response.reportSetting.nextReportDate);
        } else {
          setNextReportDate(null);
        }
        
        onCloseDrawer();
        toast.success("Report setting updated successfully");
      })
      .catch((error) => {
        toast.error(error.data.message || "Failed to update report setting");
      });
  };

  // Get summary text based on form values
  const getScheduleSummary = () => {
    if (!form.watch("isEnabled")) {
      return "Automated reports are currently disabled. Enable the toggle above to start receiving scheduled email reports.";
    }
    
    const frequency = form.watch("frequency");
    
    switch (frequency) {
      case "DAILY":
        return "Your financial report will be sent every day at 11:59 PM covering the previous day's transactions.";
      case "WEEKLY":
        return "Your financial report will be sent once a week covering the last 7 days of transactions.";
      case "BI_WEEKLY":
        return "Your financial report will be sent every 15 days covering the last 15 days of transactions.";
      case "MONTHLY":
        return "Your financial report will be sent on the 1st of each month covering the previous month's transactions.";
      default:
        return "Your report will be sent automatically based on the selected frequency.";
    }
  };

  return (
    <div className="pt-5 px-2.5">
      {/* Instant Report Generation Section */}
      <div className="mb-6 border-b pb-6">
        <InstantReportGenerator />
      </div>

      {/* Scheduled Reports Section */}
      <div className="px-4 mb-4">
        <h3 className="text-lg font-semibold mb-1">Automated Email Reports</h3>
        <p className="text-sm text-muted-foreground">
          Schedule reports to be sent automatically to your email
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="w-full space-y-6 flex-1 px-4">
            {/* Enable/Disable Switch */}
            <FormField
              control={form.control}
              name="isEnabled"
              render={({ field }) => (
                <FormItem
                  className="flex flex-row items-center justify-between 
                rounded-lg border p-4"
                >
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Automated Email Reports</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      {form.watch("isEnabled")
                        ? `Active - ${form.watch("frequency") === "DAILY" ? "Daily" : form.watch("frequency") === "WEEKLY" ? "Weekly" : form.watch("frequency") === "BI_WEEKLY" ? "Every 15 Days" : "Monthly"} reports enabled`
                        : "Reports deactivated"}
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="relative space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Enter email address"
                          disabled={!form.watch("isEnabled")}
                          {...field}
                          className="flex-1"
                        />
                      </FormControl>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reports will be sent to this email address
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Frequency */}
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat On</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!form.watch("isEnabled")}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DAILY">Daily</SelectItem>
                        <SelectItem value="WEEKLY">Weekly</SelectItem>
                        <SelectItem value="BI_WEEKLY">Every 15 Days</SelectItem>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Disabled overlay */}
              {!form.watch("isEnabled") && (
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 rounded-lg z-10" />
              )}
            </div>

            {/* Schedule Summary */}
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <h3 className="font-medium mb-2">Schedule Summary</h3>
              <p className="text-sm text-muted-foreground">
                {getScheduleSummary()}
              </p>
              
              {/* Next Report Date */}
              {form.watch("isEnabled") && nextReportDate && (
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground">Next Report Date</p>
                    <p className="text-sm font-semibold">
                      {format(new Date(nextReportDate), "MMMM dd, yyyy 'at' hh:mm a")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 py-2 z-[60]">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-white"
              >
                {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ScheduleReportForm;

