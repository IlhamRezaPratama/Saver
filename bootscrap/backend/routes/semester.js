import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';
import SemesterHistory from '../models/SemesterHistory.js';

const router = express.Router();

// @route   GET /api/semester/history
// @desc    Get semester history for logged in user
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    const history = await SemesterHistory.find({ userId: req.userId })
      .sort({ semester: -1 })
      .lean();

    res.json({
      success: true,
      history
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/semester/update
// @desc    Update semester and save to history
// @access  Private
router.post(
  '/update',
  [
    auth,
    body('semester').isInt({ min: 1, max: 14 }),
    body('ipkLokal').isFloat({ min: 0, max: 4 }),
    body('ipkUtama').isFloat({ min: 0, max: 4 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { semester, ipkLokal, ipkUtama } = req.body;

      // Get current user data
      const user = await User.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Save old data to history if semester is changing
      if (user.semesterAktif !== semester) {
        await SemesterHistory.create({
          userId: req.userId,
          semester: user.semesterAktif,
          ipkLokal: user.ipkLokal,
          ipkUtama: user.ipkUtama
        });
      }

      // Update user with new data
      user.semesterAktif = semester;
      user.ipkLokal = ipkLokal;
      user.ipkUtama = ipkUtama;
      user.lastUpdatedSemester = semester;

      await user.save();

      res.json({
        success: true,
        message: 'Semester updated successfully',
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Update semester error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
);

export default router;
