import mongoose from 'mongoose';

const sosAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  triggeredAt: {
    type: Date,
    default: Date.now
  },
  contactsNotified: [
    {
      name: String,
      phone: String,
      relation: String,
      status: String // "Sent" or "Failed"
    }
  ]
});

const SOSAlert = mongoose.model('SOSAlert', sosAlertSchema);
export default SOSAlert;
