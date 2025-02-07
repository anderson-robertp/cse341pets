const router = require('express').Router();
const userCont = require('../controllers/userCont');

router.get('/', userCont.getAllUsers);

module.exports = router;