
const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const money =require('./money')
const photo = require('./photo')

router.use('/auth', auth)
router.use('/user', authMiddleware)

router.use('/money', money)
router.use('/photo',photo)

module.exports = router
