import { sendEmail } from "./mailer";
import { Env } from "../config/env.config";

interface WelcomeEmailParams {
  name: string;
  email: string;
}

/**
 * PHASE 3: Isolated Welcome Email Service
 * - No dependencies on report/cron systems
 * - Handles errors silently
 * - Sends asynchronously
 */
export const sendWelcomeEmail = async ({ name, email }: WelcomeEmailParams): Promise<void> => {
  try {
    const subject = "Welcome to FinEnsure! 🎉";
    const dashboardUrl = `${Env.FRONTEND_ORIGIN}/overview`;
    
    const htmlContent = generateWelcomeEmailHTML(name, dashboardUrl);
    const textContent = generateWelcomeEmailText(name, dashboardUrl);

    await sendEmail({
      to: email,
      subject,
      html: htmlContent,
      text: textContent,
    });

    console.log(`✅ Welcome email sent to ${email}`);
  } catch (error) {
    // PHASE 5: Silent failure - log only, don't throw
    console.error(`❌ Failed to send welcome email to ${email}:`, error);
  }
};

/**
 * PHASE 4: Premium HTML Email Template
 * - Inline CSS for email client compatibility
 * - Mobile-responsive (600px width)
 * - FinEnsure branding
 * - Professional fintech/SaaS design
 */
function generateWelcomeEmailHTML(name: string, dashboardUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FinEnsure</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <!-- Container -->
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%); padding: 60px 20px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="background: linear-gradient(to bottom, #ffffff 0%, #fefefe 100%); border-radius: 24px; box-shadow: 0 20px 60px rgba(20, 184, 166, 0.15), 0 0 1px rgba(0, 0, 0, 0.05); max-width: 600px; width: 100%; overflow: hidden; border: 1px solid rgba(20, 184, 166, 0.1);">
          
          <!-- Decorative Top Border -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #14b8a6 0%, #0d9488 50%, #14b8a6 100%);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #14b8a6 100%); padding: 50px 40px; text-align: center; position: relative;">
              <!-- Decorative elements -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);"></div>
              
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="position: relative; z-index: 1;">
                    <!-- Logo with glow effect -->
                    <div style="display: inline-block; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); padding: 20px; border-radius: 24px; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);">
                      <img src="${Env.FRONTEND_ORIGIN}/assets/finensure-logo.png" alt="FinEnsure" width="80" height="80" style="display: block; border-radius: 16px;" />
                    </div>
                    <!-- App Name with premium typography -->
                    <h1 style="margin: 0; font-size: 42px; font-weight: 800; color: #ffffff; letter-spacing: -1px; text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);">FinEnsure</h1>
                    <p style="margin: 12px 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.95); font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">Your Personal Finance Companion</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Content -->
          <tr>
            <td style="padding: 60px 50px 40px;">
              <!-- Welcome Headline with gradient -->
              <h2 style="margin: 0 0 24px; font-size: 36px; font-weight: 800; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-align: center; line-height: 1.2; letter-spacing: -0.5px;">
                Welcome aboard, ${name}! 🎉
              </h2>
              
              <!-- Welcome Message -->
              <p style="margin: 0 0 32px; font-size: 17px; line-height: 1.7; color: #334155; text-align: center; font-weight: 400;">
                We're <strong style="color: #14b8a6;">thrilled</strong> to have you join FinEnsure! You've taken the first step towards mastering your finances with AI-powered insights and smart tracking.
              </p>

              <!-- Value Proposition Cards -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; padding: 32px 28px; margin: 40px 0; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);">
                <p style="margin: 0 0 20px; font-size: 17px; font-weight: 700; color: #0f172a; text-align: center; letter-spacing: -0.3px;">
                  ✨ Here's what you can do with FinEnsure
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 12px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td width="40" valign="top">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);">📊</div>
                          </td>
                          <td style="color: #475569; font-size: 15px; line-height: 1.6; padding-left: 12px;">
                            <strong style="color: #1e293b;">Track income and expenses</strong> effortlessly
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td width="40" valign="top">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);">🤖</div>
                          </td>
                          <td style="color: #475569; font-size: 15px; line-height: 1.6; padding-left: 12px;">
                            Get <strong style="color: #1e293b;">AI-powered financial insights</strong>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td width="40" valign="top">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);">📈</div>
                          </td>
                          <td style="color: #475569; font-size: 15px; line-height: 1.6; padding-left: 12px;">
                            <strong style="color: #1e293b;">Visualize your spending</strong> patterns
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td width="40" valign="top">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);">📧</div>
                          </td>
                          <td style="color: #475569; font-size: 15px; line-height: 1.6; padding-left: 12px;">
                            Receive <strong style="color: #1e293b;">automated financial reports</strong>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td width="40" valign="top">
                            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);">🎯</div>
                          </td>
                          <td style="color: #475569; font-size: 15px; line-height: 1.6; padding-left: 12px;">
                            <strong style="color: #1e293b;">Achieve your financial goals</strong> faster
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Primary CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 48px 0 40px;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-radius: 12px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); box-shadow: 0 8px 24px rgba(20, 184, 166, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;">
                          <a href="${dashboardUrl}" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 18px 56px; font-size: 17px; font-weight: 700; letter-spacing: 0.3px; border-radius: 12px; position: relative;">
                            <span style="position: relative; z-index: 1;">Go to Dashboard →</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%); margin: 40px 0;"></div>

              <!-- Secondary Links -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <p style="margin: 0 0 20px; font-size: 15px; color: #64748b; font-weight: 500;">
                      Need help getting started?
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding: 0 16px;">
                          <a href="${Env.FRONTEND_ORIGIN}/resources/docs" style="display: inline-block; color: #14b8a6; text-decoration: none; font-size: 15px; font-weight: 600; padding: 8px 16px; border-radius: 8px; background: rgba(20, 184, 166, 0.08); transition: all 0.2s;">
                            📚 Documentation
                          </a>
                        </td>
                        <td style="padding: 0 16px;">
                          <a href="${Env.FRONTEND_ORIGIN}/resources/blogs" style="display: inline-block; color: #14b8a6; text-decoration: none; font-size: 15px; font-weight: 600; padding: 8px 16px; border-radius: 8px; background: rgba(20, 184, 166, 0.08); transition: all 0.2s;">
                            💬 Support
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 40px; text-align: center; border-radius: 0 0 24px 24px; position: relative;">
              <!-- Decorative top border -->
              <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(20, 184, 166, 0.5) 50%, transparent 100%);"></div>
              
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <!-- Brand -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 24px;">
                      <tr>
                        <td>
                          <img src="${Env.FRONTEND_ORIGIN}/assets/finensure-logo.png" alt="FinEnsure" width="40" height="40" style="display: block; border-radius: 8px; margin: 0 auto 12px;" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                            FinEnsure
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Description -->
                    <p style="margin: 0 0 24px; font-size: 14px; color: #94a3b8; line-height: 1.7;">
                      Smart Finance Tracking • AI-Powered Insights<br />
                      © ${new Date().getFullYear()} FinEnsure. All rights reserved.
                    </p>
                    
                    <!-- Divider -->
                    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.2) 50%, transparent 100%); margin: 24px 0;"></div>
                    
                    <!-- Legal Text -->
                    <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.6;">
                      You're receiving this email because you signed up for FinEnsure.<br />
                      This is a one-time welcome email. We won't spam you! 🎯
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Plain text fallback version
 */
function generateWelcomeEmailText(name: string, dashboardUrl: string): string {
  return `
Welcome to FinEnsure, ${name}!

We're thrilled to have you join FinEnsure! You've taken the first step towards mastering your finances with AI-powered insights and smart tracking.

Here's what you can do with FinEnsure:
- Track income and expenses effortlessly
- Get AI-powered financial insights
- Visualize your spending patterns
- Receive automated financial reports
- Achieve your financial goals faster

Get Started: ${dashboardUrl}

Need help? Visit our documentation or contact support:
- Documentation: ${Env.FRONTEND_ORIGIN}/resources/docs
- Support: ${Env.FRONTEND_ORIGIN}/resources/blogs

FinEnsure - Smart Finance Tracking • AI-Powered Insights
© ${new Date().getFullYear()} FinEnsure. All rights reserved.
  `.trim();
}
