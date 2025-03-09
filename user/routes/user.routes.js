const express = require('express');
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middleware/authMiddleware.js")

const router = express.Router();

router.post('/register', userController.register);
router.post('/login' , userController.login)
router.get('/logout' , userController.logout)
router.get('/profile', authMiddleware.userAuth,userController.profile)

module.exports = router