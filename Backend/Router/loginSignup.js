import express from 'express';
import login from '../Controllers/userController/login.js';
import signup from '../Controllers/userController/signup.js';
import verifyUser from '../Controllers/userController/verifyUser.js';
import isAuthenticated from '../middlewares/authenticated.js';
import userData from '../Controllers/userController/userData.js';
import recoverPassword from '../Controllers/passwordController/recoverPassword.js';
import verifyOtp from '../Controllers/otpController/verifyOtp.js';
import updatePassword from '../Controllers/passwordController/updatePassword.js';
import resendOtp from '../Controllers/otpController/resendOtp.js';
const router = express.Router({ mergeParams: true });

// login
router.post('/login', login);

// signup
router.post('/signup', signup);

// verify new user otp
router.post('/otp', verifyUser);

// fetch user
router.get('/:id', isAuthenticated, userData);

// recover password
router.post('/recover-password', recoverPassword);

// verify otp
router.post('/verify-otp', verifyOtp);

// update password
router.post('/:id', updatePassword);

// resend otp
router.get('/:id', resendOtp);

export default router;