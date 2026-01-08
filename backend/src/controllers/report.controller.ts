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

    // Define color palette
    const colors = {
      primary: '#00bc7d',
      primaryDark: '#00a56e',
      secondary: '#667eea',
      income: '#22c55e',
      expense: '#ef4444',
      balance: '#3b82f6',
      savings: '#8b5cf6',
      dark: '#2d3748',
      gray: '#718096',
      lightGray: '#e2e8f0',
      white: '#ffffff'
    };

    // Add gradient-like header background using rectangles
    const pageWidth = doc.page.width;
    doc.rect(0, 0, pageWidth, 180)
       .fillAndStroke(colors.primary, colors.primaryDark)
       .fill();

    // Add FinEnsure logo/brand at the top
    doc.fontSize(36)
       .fillColor(colors.white)
       .font('Helvetica-Bold')
       .text('FinEnsure', 50, 40, { align: 'center' })
       .moveDown(0.3);

    // Add report title
    doc.fontSize(20)
       .fillColor(colors.white)
       .font('Helvetica-Bold')
       .text('Financial Report', { align: 'center' })
       .moveDown(0.3);

    // Use the period from report service (correctly formatted)
    doc.fontSize(13)
       .fillColor(colors.white)
       .font('Helvetica')
       .text(report.period, { align: 'center' })
       .moveDown(2);

    // Reset Y position after header
    doc.y = 200;

    // Add Summary section with colored cards
    doc.fontSize(20)
       .fillColor(colors.dark)
       .font('Helvetica-Bold')
       .text('Summary', 50)
       .moveDown(1);

    const cardWidth = (pageWidth - 140) / 2;
    const cardHeight = 80;
    let currentY = doc.y;
    const cardSpacing = 20;

    // Helper function to draw a colored card
    const drawCard = (x: number, y: number, color: string, label: string, value: string) => {
      // Draw card background
      doc.roundedRect(x, y, cardWidth, cardHeight, 8)
         .fillAndStroke(color, color)
         .fill();
      
      // Add label
      doc.fontSize(11)
         .fillColor(colors.white)
         .font('Helvetica')
         .text(label, x + 15, y + 18, { width: cardWidth - 30 });
      
      // Add value
      doc.fontSize(24)
         .fillColor(colors.white)
         .font('Helvetica-Bold')
         .text(value, x + 15, y + 40, { width: cardWidth - 30 });
    };

    // Row 1: Income and Expenses
    drawCard(50, currentY, colors.income, 'TOTAL INCOME', `$${report.summary.income}`);
    drawCard(50 + cardWidth + 20, currentY, colors.expense, 'TOTAL EXPENSES', `$${report.summary.expenses}`);

    currentY += cardHeight + cardSpacing;

    // Row 2: Balance and Savings Rate
    drawCard(50, currentY, colors.balance, 'CURRENT BALANCE', `$${report.summary.balance}`);
    drawCard(50 + cardWidth + 20, currentY, colors.savings, 'SAVINGS RATE', `${report.summary.savingsRate}%`);

    currentY += cardHeight + 40;
    doc.y = currentY;

    // Add top spending categories in a beautiful table
    if (report.summary.topCategories && report.summary.topCategories.length > 0) {
      doc.fontSize(20)
         .fillColor(colors.dark)
         .font('Helvetica-Bold')
         .text('Top Spending Categories', 50)
         .moveDown(1);

      // Table header background
      const tableTop = doc.y;
      const tableLeft = 50;
      const colWidths = [220, 120, 100];
      
      // Draw header row
      doc.rect(tableLeft, tableTop, pageWidth - 100, 35)
         .fillAndStroke(colors.lightGray, colors.lightGray)
         .fill();

      doc.fontSize(11)
         .fillColor(colors.dark)
         .font('Helvetica-Bold')
         .text('CATEGORY', tableLeft + 12, tableTop + 12, { width: colWidths[0] })
         .text('AMOUNT', tableLeft + colWidths[0] + 12, tableTop + 12, { width: colWidths[1], align: 'right' })
         .text('PERCENTAGE', tableLeft + colWidths[0] + colWidths[1] + 12, tableTop + 12, { width: colWidths[2] - 24, align: 'right' });

      let rowY = tableTop + 35;

      // Draw category rows
      report.summary.topCategories.forEach((category: any, index: number) => {
        // Alternate row colors
        if (index % 2 === 0) {
          doc.rect(tableLeft, rowY, pageWidth - 100, 30)
             .fillAndStroke('#f9fafb', '#f9fafb')
             .fill();
        }

        doc.fontSize(11)
           .fillColor(colors.dark)
           .font('Helvetica')
           .text(category.name, tableLeft + 12, rowY + 8, { width: colWidths[0] })
           .font('Helvetica-Bold')
           .text(`$${category.amount}`, tableLeft + colWidths[0] + 12, rowY + 8, { width: colWidths[1], align: 'right' })
           .fillColor(colors.primary)
           .text(`${category.percent}%`, tableLeft + colWidths[0] + colWidths[1] + 12, rowY + 8, { width: colWidths[2] - 24, align: 'right' });

        rowY += 30;
      });

      doc.y = rowY + 30;
    }

    // Add footer note
    doc.fontSize(10)
       .fillColor(colors.gray)
       .font('Helvetica')
       .text(
         'This report was generated automatically based on your transactions during the specified period.\nKeep tracking your finances to achieve your financial goals!',
         50,
         doc.y + 20,
         { align: 'center', width: pageWidth - 100 }
       )
       .moveDown(2);

    // Add footer with FinEnsure branding
    const footerY = doc.page.height - 80;
    
    // Footer background
    doc.rect(0, footerY, pageWidth, 80)
       .fillAndStroke(colors.dark, colors.dark)
       .fill();

    // Add FinEnsure branding
    doc.fontSize(16)
       .fillColor(colors.white)
       .font('Helvetica-Bold')
       .text('FinEnsure', 50, footerY + 20, { align: 'center' });

    // Add generation timestamp
    const currentDate = new Date();
    doc.fontSize(10)
       .fillColor('#a0aec0')
       .font('Helvetica')
       .text(
         `Generated on ${format(currentDate, 'MMMM dd, yyyy')} at ${format(currentDate, 'hh:mm a')}`,
         50,
         footerY + 45,
         { align: 'center' }
       );

    // Finalize PDF
    doc.end();
  }
);