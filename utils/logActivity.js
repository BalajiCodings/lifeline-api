import ActivityLog from '../models/ActivityLog.js';

const logActivity = async (userId, action, metadata = {}) => {
    try {
        await ActivityLog.create({ user: userId, action, metadata });      
    } catch (error) {
        console.error("Activity log error:", error);
    }
};

export default logActivity;