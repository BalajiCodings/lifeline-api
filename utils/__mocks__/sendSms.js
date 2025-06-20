const sendSms = async (to, message) => {
  console.log(`MOCK SMS to ${to}: ${message}`);
  return { success: true };
};

export default sendSms;
