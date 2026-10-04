import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const activity = model('Activity', activitySchema);
