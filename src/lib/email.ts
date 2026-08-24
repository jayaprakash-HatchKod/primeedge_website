import { Resend } from "resend";
import { formatCurrency, formatDate } from "@/lib/format";

let instance: Resend | null = null;

function getResendClient(): Resend {
  if (!instance) {
    instance = new Resend(process.env.RESEND_API_KEY);
  }
  return instance;
}

type EnrollmentConfirmationInput = {
  to: string;
  studentName: string;
  courseName: string;
  studentId: string;
  paymentId: string;
  amount: number;
};

export async function sendEnrollmentConfirmationEmail({
  to,
  studentName,
  courseName,
  studentId,
  paymentId,
  amount,
}: EnrollmentConfirmationInput) {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    console.error("[email] RESEND_FROM_EMAIL is not set — skipping enrollment confirmation email");
    return;
  }

  const institutePhone = process.env.NEXT_PUBLIC_INSTITUTE_PHONE ?? "";
  const instituteEmail = process.env.NEXT_PUBLIC_INSTITUTE_EMAIL ?? "";
  const telegramLink = process.env.TELEGRAM_STUDENTS_LINK;

  const receiptRows: Array<[string, string]> = [
    ["Course", courseName],
    ["Amount Paid", formatCurrency(amount)],
    ["Student ID", studentId],
    ["Payment ID", paymentId],
    ["Date", formatDate(new Date())],
  ];

  const html = `
    <div style="background: #f8fafc; padding: 32px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">

        <div style="background: #0f172a; padding: 28px 32px;">
          <p style="margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #38bdf8;">
            PrimeEdge Software Institute
          </p>
          <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 600; color: #ffffff;">
            You're enrolled, ${studentName}!
          </h1>
        </div>

        <div style="padding: 32px;">
          <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #475569;">
            Thanks for enrolling — payment received and your seat is confirmed. Here's your receipt.
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 28px;">
            ${receiptRows
              .map(
                ([label, value], i) => `
              <tr>
                <td style="padding: 10px 0; color: #64748b; border-top: ${i === 0 ? "none" : "1px solid #f1f5f9"};">${label}</td>
                <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #0f172a; border-top: ${i === 0 ? "none" : "1px solid #f1f5f9"};">${value}</td>
              </tr>`,
              )
              .join("")}
          </table>

          ${
            telegramLink
              ? `
          <table role="presentation" style="width: 100%; margin-bottom: 24px;">
            <tr>
              <td align="center">
                <a href="${telegramLink}" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 10px;">
                  Join Your Batch on Telegram
                </a>
              </td>
            </tr>
          </table>
          `
              : ""
          }

          <div style="background: #f8fafc; border-radius: 12px; padding: 18px 20px;">
            <p style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #0f172a;">What happens next?</p>
            <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #475569;">
              ${telegramLink ? "Join the Telegram group above to get your batch schedule and updates. " : "Our team will reach out shortly with your batch schedule and access details. "}
              Questions? Reach us at
              ${instituteEmail ? `<a href="mailto:${instituteEmail}" style="color: #2563eb; text-decoration: none;">${instituteEmail}</a>` : "our support email"}
              ${institutePhone ? ` or call ${institutePhone}.` : "."}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  try {
    await getResendClient().emails.send({
      from,
      to,
      // Sent from a no-reply address, so point replies at the staffed inbox.
      replyTo: instituteEmail || undefined,
      subject: `Enrollment confirmed — ${courseName}`,
      html,
    });
  } catch (error) {
    console.error("[email] Failed to send enrollment confirmation", error);
  }
}
