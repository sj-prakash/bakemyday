import express from 'express'
import { authUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import { registerUser } from '../controllers/userController.js'

const router = express.Router()


router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect,getUserProfile)
router.route('/profile').put(protect, updateUserProfile)


export default router