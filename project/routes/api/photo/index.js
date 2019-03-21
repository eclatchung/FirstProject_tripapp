const router = require('express').Router()
const controller = require('./controllerImg')
const authMiddleware = require('../../../middlewares/auth')



router.post('/posttitle', controller.postphoto)
router.post('/showphoto',controller.showphoto)



router.post('/savepost',controller.uploadphoto)

//router.use('/getmoney', authMiddleware)
//router.post('/getmoney', controllerM.showMoney)

module.exports = router
