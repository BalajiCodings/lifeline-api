import sendSms from './sendSms.js';

const notifyContact = async (contact, user) => {
  const message = `🚨 SOS from ${user.name} (${user.email})! Please contact them ASAP.`;
  return await sendSms(contact.phone, message);
};

export default notifyContact;
