import dotenv from 'dotenv';
dotenv.config();

let sendSms;

if (process.env.USE_SMS_MOCK === 'true') {
  sendSms = (await import('./__mocks__/sendSms.js')).default;
} else {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  sendSms = async (to, body) => {
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
}

export default sendSms;
