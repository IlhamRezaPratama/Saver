import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    namaLengkap: {
      type: String,
      required: true,
      trim: true
    },
    nim: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    programStudi: {
      type: String,
      required: true,
      trim: true
    },
    profilePhoto: {
      type: String,
      default: null,
      // Stores base64 encoded image or URL
      // Max size enforced at application level (2MB)
    },
    semesterAktif: {
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
    targetIpk: {
      type: Number,
      required: true,
      min: 0,
      max: 4
    },
    totalSks: {
      type: Number,
      required: true,
      min: 0
    },
    onboardingCompleted: {
      type: Boolean,
      default: false
    },
    lastUpdatedSemester: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Don't return password in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;
