const express = require('express')
const router = express.Router()
const {registerUser, loginUser, resetPassword} = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/reset-password/:userId', resetPassword)


module.exports = router