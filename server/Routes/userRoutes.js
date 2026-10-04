import express from 'express'
import { registerUser , loginUser, updateUser ,deleteUser, getProfile, verifyOtp } from '../controllers/userController.js'
import { authMiddleWare } from '../middleware/authMiddle.js'

const router = express.Router()
router.post('/register', registerUser)
router.get('/login',loginUser)
router.patch('/update/:id',updateUser)
router.delete("/delete/:id" , deleteUser)
router.get('/getprofile',authMiddleWare,getProfile)
router.post('/verify-otp', verifyOtp)

export default router