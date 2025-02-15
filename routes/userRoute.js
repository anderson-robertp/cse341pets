const router = require('express').Router();
const userCont = require('../controllers/userCont');
const { validateUser } = require('../validation/validSchema');

router.get('/', userCont.getAllUsers);
router.get('/:id', userCont.getUser);
router.post('/', validateUser, userCont.createUser);
router.put('/:id', validateUser, userCont.updateUser);
router.delete('/:id', userCont.deleteUser);

module.exports = router;