import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middlerware";
import { HTTPSTATUS } from "../config/http.config";
import { format } from "date-fns";
import {
  generateReportService,
  getAllReportsService,
  updateReportSettingService,
} from "../services/report.service";
import { updateReportSettingSchema } from "../validators/report.validator";

export const getAllReportsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const pagination = {
      pageSize: parseInt(req.query.pageSize as string) || 20,
      pageNumber: parseInt(req.query.pageNumber as string) || 1,
    };

    const result = await getAllReportsService(userId, pagination);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports history fetched successfully",
      ...result,
    });
  }
);

export const updateReportSettingController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const body = updateReportSettingSchema.parse(req.body);

    await updateReportSettingService(userId, body);

    return res.status(HTTPSTATUS.OK).json({
      message: "Reports setting updated successfully",
    });
  }
);

export const generateReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { from, to } = req.query;
    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const result = await generateReportService(userId, fromDate, toDate);

    return res.status(HTTPSTATUS.OK).json({
      message: "Report generated successfully",
      ...result,
    });
  }
);

export const generatePDFReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { from, to } = req.query;
    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const report = await generateReportService(userId, fromDate, toDate);

    if (!report) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "No transactions found for the selected period",
      });
    }

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=financial-report-${format(fromDate, 'yyyy-MM-dd')}-to-${format(toDate, 'yyyy-MM-dd')}.pdf`
    );

    // Import PDFDocument dynamically
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    // Pipe the PDF to response
    doc.pipe(res);

    // Add header
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .text('Financial Report', { align: 'center' })
      .moveDown(0.5);

    // Format the date range properly
    const dateRange = `${format(fromDate, 'MMMM d, yyyy')} - ${format(toDate, 'MMMM d, yyyy')}`;
    
    doc
      .fontSize(12)
      .font('Helvetica')
      .text(dateRange, { align: 'center' })
      .moveDown(1.5);

    // Add summary section
    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .text('Summary', { underline: true })
      .moveDown(0.5);

    const summary = [
      { label: 'Total Income', value: `$${report.summary.income}` },
      { label: 'Total Expenses', value: `$${report.summary.expenses}` },
      { label: 'Available Balance', value: `$${report.summary.balance}` },
      { label: 'Savings Rate', value: `${report.summary.savingsRate}%` },
    ];

    summary.forEach(({ label, value }) => {
      doc
        .fontSize(12)
        .font('Helvetica')
        .text(`${label}: `, { continued: true })
        .font('Helvetica-Bold')
        .text(value)
        .moveDown(0.3);
    });

    doc.moveDown(1);

    // Add top spending categories
    if (report.summary.topCategories && report.summary.topCategories.length > 0) {
      doc
        .fontSize(16)
        .font('Helvetica-Bold')
        .text('Top Spending Categories', { underline: true })
        .moveDown(0.5);

      report.summary.topCategories.forEach((category: any, index: number) => {
        doc
          .fontSize(12)
          .font('Helvetica')
          .text(`${index + 1}. ${category.name}: `, { continued: true })
          .font('Helvetica-Bold')
          .text(`$${category.amount} (${category.percent}%)`)
          .moveDown(0.3);
      });

      doc.moveDown(1);
    }

    // Add insights
    if (report.insights && Array.isArray(report.insights) && report.insights.length > 0) {
      doc
        .fontSize(16)
        .font('Helvetica-Bold')
        .text('AI Insights', { underline: true })
        .moveDown(0.5);

      report.insights.forEach((insight: any, index: number) => {
        doc
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(`${index + 1}. ${insight.title}`, { continued: false })
          .moveDown(0.2);
        
        doc
          .fontSize(11)
          .font('Helvetica')
          .text(insight.insight, { align: 'justify' })
          .moveDown(0.5);
      });

      doc.moveDown(0.5);
    }

    // Add footer
    doc
      .fontSize(10)
      .font('Helvetica')
      .text(`Generated on ${format(new Date(), 'MMMM dd, yyyy')} at ${format(new Date(), 'HH:mm')}`, {
        align: 'center',
      });

    // Finalize PDF
    doc.end();
  }
);