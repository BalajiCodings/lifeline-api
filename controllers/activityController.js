import ActivityLog from '../models/ActivityLog.js';

export const getUserActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find({ user: req.user.userId }).sort({ timestamp: -1 });
        res.status(200).json({ logs });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching activity logs' });
    }
}