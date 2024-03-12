import express from 'express';
import {login,
    registerFamily,
    getFamilyProfile,
    editFamilyProfile,
    deleteFamilyProfile,
    getUserProfile,
    logoutUser,
    addFamilyMember,
    changePassword,
    deleteFamilyMember,
    editFamilyMember,
    verifyCode,
    getNewVerificationCode
}  from '../controllers/authController.js';
import { sendVerificationEmail } from '../utils/emailUtils.js';
import { protect, isParent } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/',login);
router.post('/family',registerFamily);
router.get('/send-verification-email',protect, sendVerificationEmail);
router.post('/verify-code',protect, verifyCode);
router.get('/family',protect,getFamilyProfile);
router.put('/family',protect,editFamilyProfile);
router.delete('/family',protect,deleteFamilyProfile);
router.route('/user')
    .post(protect,addFamilyMember)
    .get(protect,getUserProfile)
    .put(protect,editFamilyMember)
    .delete(protect,deleteFamilyMember)
router.put('/change-password',protect,changePassword)
router.post('/logout',logoutUser);
router.put('/editFamilyProfile', protect,isParent, editFamilyProfile)
router.get('/getVerificationCode', protect, getNewVerificationCode)

export default router;
