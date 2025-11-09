import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export async function triggerEmergencyCall(alertMessage: string) {
  try {
    const call = await client.calls.create({
      twiml: `
        <Response>
          <Say voice="alice">
            ${alertMessage}.
            This is an automated safety alert from your AI Therapist app.
            Please reach out to the user immediately.
          </Say>
          <Pause length="2"/>
          <Say voice="alice">
            Thank you. This concludes the alert message.
          </Say>
        </Response>
      `,
      to: process.env.ALERT_PHONE_NUMBER as string, // your number
      from: process.env.TWILIO_FROM_NUMBER as string, // your Twilio number
    });

    console.log("🚨 Emergency call initiated:", call.sid);
  } catch (error) {
    console.error("❌ Error initiating call:", error);
  }
}
