import express from "express"

const router = express.Router();
import {
    register,login,logout,getProfile
} from "../controllers/user.controller.js"

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',getProfile);

module.exports = router;




