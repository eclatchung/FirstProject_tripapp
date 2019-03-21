const router = require('express').Router()
const controller = require('./controllerMoney')
const authMiddleware = require('../../../middlewares/auth')



router.post('/postdate', controller.postcreate)
router.post('/showmoney',controller.getshow)



router.post('/savepost',controller.uploadmoney)

//router.use('/getmoney', authMiddleware)
//router.post('/getmoney', controllerM.showMoney)

module.exports = router
