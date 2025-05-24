import Contact from '../models/Contact.js';
import logActivity from '../utils/logActivity.js';

export const triggerSOS = async (req, res) => {
    try {
        const userId = req.user.userId;

        const contacts = await Contact.find({ user: userId });

        if(contacts.length === 0) {
            return res.status(404).json({ message:"No emergency contacts seved by balaji and other users" });
        }

        const alertLog = contacts.map(contact => {
            return `Alert sent to ${ contact.name } (${contact.phone}) [${contact.relation}]`;
        });

        console.log("SOS ALERT LOG: ", alertLog);
        await logActivity(userId, 'SOS_Triggered', { contactCount: contacts.length });

        res.status(200).json({
            message: "SOS alerts triggered successfully!",
            details: alertLog
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to trigger SOS alert" });
    }
};