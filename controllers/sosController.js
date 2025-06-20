import Contact from '../models/Contact.js';
import logActivity from '../utils/logActivity.js';
import sendSms from '../utils/sendSms.js'; 
import User from '../models/User.js';
import SOSAlert from '../models/SOSAlert.js'; 


export const triggerSOS = async (req, res) => {
  try {
    const userId = req.user.userId;

    const contacts = await Contact.find({ user: userId });

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No emergency contacts saved." });
    }

    const user = await User.findById(userId);

    const alertLog = [];
    const notifiedContacts = [];

    for (const contact of contacts) {
      const message = `SOS Alert from ${user.name} (${user.email})! Please contact them immediately.`;

      const result = await sendSms(contact.phone, message);
      const status = result.success ? 'Sent' : 'Failed';

      alertLog.push(`${status} alert to ${contact.name} (${contact.phone}) [${contact.relation}]`);

      notifiedContacts.push({
        name: contact.name,
        phone: contact.phone,
        relation: contact.relation,
        status
      });
    }

    await logActivity(userId, 'SOS_Triggered', { contactCount: contacts.length });

    await SOSAlert.create({
      user: userId,
      contactsNotified: notifiedContacts
    });


    res.status(200).json({
      message: "SOS alerts triggered via Twilio!",
      details: alertLog
    });
  } catch (err) {
    console.error("SOS Trigger Error:", err);
    res.status(500).json({ message: "Failed to trigger SOS alert" });
  }
};


export const getSOSHistory = async (req, res) => {
  try {
    const history = await SOSAlert.find({ user: req.user.userId }).sort({ triggeredAt: -1 });
    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch SOS alert history' });
  }
};
