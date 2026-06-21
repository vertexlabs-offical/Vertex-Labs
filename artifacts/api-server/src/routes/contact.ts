import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { z } from "zod/v4";

const router: IRouter = Router();

const ContactSchema = z.object({
  name: z.string().min(1),
  businessName: z.string().min(1),
  email: z.string().email(),
  description: z.string().min(1),
  budget: z.string().optional(),
});

router.post("/contact", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid form data" });
    return;
  }

  const { name, businessName, email, description, budget } = parsed.data;

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    req.log.error("Gmail credentials not configured");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0a0a0f;color:#f0f0f0;border-radius:12px;overflow:hidden;border:1px solid #2d1f4e;">
      <div style="background:linear-gradient(135deg,#3d1a7a,#1a0a3d);padding:32px 36px;">
        <h1 style="margin:0;font-size:24px;color:#fff;letter-spacing:-0.5px;">New Project Enquiry</h1>
        <p style="margin:6px 0 0;color:#a78bfa;font-size:14px;">via Vertex Labs website</p>
      </div>
      <div style="padding:32px 36px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;color:#a78bfa;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:140px;">Name</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;color:#fff;font-size:15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;color:#a78bfa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Business</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;color:#fff;font-size:15px;">${businessName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;color:#a78bfa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;font-size:15px;"><a href="mailto:${email}" style="color:#8b3cf7;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;color:#a78bfa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Budget</td>
            <td style="padding:12px 0;border-bottom:1px solid #1e1333;color:#fff;font-size:15px;">${budget || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding:16px 0 0;color:#a78bfa;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Description</td>
            <td style="padding:16px 0 0;color:#e0e0e0;font-size:15px;line-height:1.6;">${description.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
      </div>
      <div style="padding:20px 36px;background:#060609;border-top:1px solid #1e1333;">
        <p style="margin:0;font-size:12px;color:#555;">Reply directly to this email to respond to ${name}.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Vertex Labs Website" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New Enquiry from ${name} — ${businessName}`,
      html,
    });

    req.log.info({ email, name }, "Contact form submitted");
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
