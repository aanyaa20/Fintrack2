import { ReportType } from "../../@types/report.type";
import { formatCurrency } from "../../utils/format-currency";
import { capitalizeFirstLetter } from "../../utils/helper";

export const getReportEmailTemplate = (
  reportData: ReportType & { username: string },
  frequency: string
) => {
  const {
    username,
    period,
    totalIncome,
    totalExpenses,
    currentBalance,
    savingsRate,
    topSpendingCategories,
  } = reportData;

  const reportTitle = `${capitalizeFirstLetter(frequency)} Report`;

  const categoryList = topSpendingCategories
    .map(
      (cat: any) => `<tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${cat.name}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5; text-align: right; font-size: 14px; font-weight: 500;">${formatCurrency(cat.amount)}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid #e5e5e5; text-align: right; font-size: 14px; color: #00bc7d;">${cat.percent}%</td>
      </tr>`
    )
    .join("");

  const currentYear = new Date().getFullYear();
  return `
  <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <title>${reportTitle}</title>
     <!-- Google Fonts Link -->
     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   </head>
   <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 16px;">
     <table cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px;">
       <tr>
         <td>
           <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; margin: auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
             
             <!-- Logo & Header -->
             <tr>
               <td style="background: linear-gradient(135deg, #00bc7d 0%, #00d4aa 100%); padding: 40px 30px; text-align: center;">
                 <table cellpadding="0" cellspacing="0" width="100%">
                   <tr>
                     <td style="text-align: center; padding-bottom: 15px;">
                       <div style="display: inline-block; background-color: rgba(255,255,255,0.2); border-radius: 12px; padding: 12px 24px;">
                         <h1 style="margin: 0; font-size: 32px; color: #ffffff; font-weight: 700; letter-spacing: -0.5px;">FinEnsure</h1>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td style="text-align: center;">
                       <h2 style="margin: 10px 0 0 0; font-size: 24px; color: #ffffff; font-weight: 600; text-transform: capitalize">${reportTitle}</h2>
                       <p style="margin: 5px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.9);">${period}</p>
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>
             
             <!-- Greeting -->
             <tr>
               <td style="padding: 30px 30px 20px 30px;">
                 <p style="margin: 0; font-size: 18px; color: #2d3748;">Hi <strong style="color: #00bc7d;">${username}</strong>,</p>
                 <p style="margin: 10px 0 0 0; font-size: 15px; color: #718096;">Here's your financial summary for the period.</p>
               </td>
             </tr>

             <!-- Financial Summary Cards -->
             <tr>
               <td style="padding: 0 30px 30px 30px;">
                 <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                   <tr>
                     <td style="padding-bottom: 12px;">
                       <table width="100%" style="background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); border-radius: 10px; padding: 20px;">
                         <tr>
                           <td>
                             <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Total Income</p>
                             <p style="margin: 8px 0 0 0; font-size: 28px; color: #ffffff; font-weight: 700;">${formatCurrency(totalIncome)}</p>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                   <tr>
                     <td style="padding-bottom: 12px;">
                       <table width="100%" style="background: linear-gradient(135deg, #f87171 0%, #ef4444 100%); border-radius: 10px; padding: 20px;">
                         <tr>
                           <td>
                             <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Total Expenses</p>
                             <p style="margin: 8px 0 0 0; font-size: 28px; color: #ffffff; font-weight: 700;">${formatCurrency(totalExpenses)}</p>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                   <tr>
                     <td style="padding-bottom: 12px;">
                       <table width="100%" style="background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); border-radius: 10px; padding: 20px;">
                         <tr>
                           <td>
                             <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Current Balance</p>
                             <p style="margin: 8px 0 0 0; font-size: 28px; color: #ffffff; font-weight: 700;">${formatCurrency(currentBalance)}</p>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <table width="100%" style="background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%); border-radius: 10px; padding: 20px;">
                         <tr>
                           <td>
                             <p style="margin: 0; font-size: 13px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Savings Rate</p>
                             <p style="margin: 8px 0 0 0; font-size: 28px; color: #ffffff; font-weight: 700;">${savingsRate.toFixed(2)}%</p>
                           </td>
                         </tr>
                       </table>
                     </td>
                   </tr>
                 </table>
               </td>
             </tr>

             <!-- Top Spending Categories -->
             <tr>
               <td style="padding: 0 30px 30px 30px;">
                 <div style="background-color: #f7fafc; border-radius: 12px; padding: 25px; border-left: 4px solid #00bc7d;">
                   <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #2d3748; font-weight: 600;">Top Spending Categories</h3>
                   <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                     <thead>
                       <tr style="background-color: #e2e8f0;">
                         <th style="padding: 12px; text-align: left; font-size: 13px; color: #4a5568; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Category</th>
                         <th style="padding: 12px; text-align: right; font-size: 13px; color: #4a5568; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Amount</th>
                         <th style="padding: 12px; text-align: right; font-size: 13px; color: #4a5568; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Percentage</th>
                       </tr>
                     </thead>
                     <tbody>
                       ${categoryList}
                     </tbody>
                   </table>
                 </div>
               </td>
             </tr>

             <!-- Footer Note -->
             <tr>
               <td style="padding: 0 30px 30px 30px;">
                 <p style="margin: 0; font-size: 13px; color: #a0aec0; text-align: center; line-height: 1.6;">
                   This report was generated automatically based on your transactions during the specified period.<br/>
                   Keep tracking your finances to achieve your financial goals!
                 </p>
               </td>
             </tr>

             <!-- Footer -->
             <tr>
               <td style="background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); text-align: center; padding: 25px; font-size: 13px; color: #cbd5e0;">
                 <p style="margin: 0; font-weight: 600; color: #ffffff; font-size: 16px;">FinEnsure</p>
                 <p style="margin: 8px 0 0 0; color: #a0aec0;">&copy; ${currentYear} FinEnsure. All rights reserved.</p>
               </td>
             </tr>
           </table>
         </td>
       </tr>
     </table>
   </body>
 </html>
   `;
};
