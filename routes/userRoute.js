const router = require('express').Router();
const userCont = require('../controllers/userCont');

router.get('/', userCont.getAllUsers);
router.get('/:id', userCont.getUser);
router.post('/', userCont.createUser);
router.put('/:id', userCont.updateUser);
router.delete('/:id', userCont.deleteUser);

module.exports = router;