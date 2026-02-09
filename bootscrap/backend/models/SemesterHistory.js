import mongoose from 'mongoose';

const semesterHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 14
    },
    ipkLokal: {
      type: Number,
      required: true,
      min: 0,
      max: 4
    },
    ipkUtama: {
      type: Number,
      required: true,
      min: 0,
      max: 4
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
semesterHistorySchema.index({ userId: 1, semester: -1 });

const SemesterHistory = mongoose.model('SemesterHistory', semesterHistorySchema);

export default SemesterHistory;
