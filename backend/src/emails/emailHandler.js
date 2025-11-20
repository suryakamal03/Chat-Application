import { resendClient } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (name, email, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: "Messenger <noreply@suryakamal.dev>", //use your verified domain email
      to: email,
      subject: "Welcome to Chat Application",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
      console.log("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);
  } catch (err) {
    console.error("Unexpected error while sending welcome email:", err);
  }
};
