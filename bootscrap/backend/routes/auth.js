import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('namaLengkap').trim().notEmpty(),
    body('nim').trim().notEmpty(),
    body('programStudi').trim().notEmpty(),
    body('semesterAktif').isInt({ min: 1, max: 14 }),
    body('ipkLokal').isFloat({ min: 0, max: 4 }),
    body('ipkUtama').isFloat({ min: 0, max: 4 }),
    body('targetIpk').isFloat({ min: 0, max: 4 }),
    body('totalSks').isInt({ min: 0 })
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const {
        email,
        password,
        namaLengkap,
        nim,
        programStudi,
        profilePhoto,
        semesterAktif,
        ipkLokal,
        ipkUtama,
        targetIpk,
        totalSks
      } = req.body;

      // Check if user already exists
      let user = await User.findOne({ $or: [{ email }, { nim }] });
      if (user) {
        return res.status(400).json({
          success: false,
          message: 'User with this email or NIM already exists'
        });
      }

      // Validate profilePhoto size if provided (base64)
      if (profilePhoto && profilePhoto.startsWith('data:image')) {
        // Rough estimate: base64 string length * 0.75 = actual bytes
        const estimatedBytes = profilePhoto.length * 0.75;
        const maxBytes = 2 * 1024 * 1024; // 2MB
        
        if (estimatedBytes > maxBytes) {
          return res.status(400).json({
            success: false,
            message: 'Profile photo size exceeds 2MB limit'
          });
        }
      }

      // Create new user
      user = new User({
        email,
        password,
        namaLengkap,
        nim,
        programStudi,
        profilePhoto: profilePhoto || null,
        semesterAktif,
        ipkLokal,
        ipkUtama,
        targetIpk,
        totalSks,
        onboardingCompleted: true,
        lastUpdatedSemester: semesterAktif
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during registration'
      });
    }
  }
);

// @route   POST /api/auth/signin
// @desc    Login user
// @access  Public
router.post(
  '/signin',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate token
      const token = generateToken(user._id);

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  }
);

export default router;
