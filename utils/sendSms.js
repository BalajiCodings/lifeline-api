import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE,
      to
    });
    console.log(`SMS sent to ${to}: SID = ${message.sid}`);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send SMS to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};

export default sendSms;
