const router = require('express').Router();
const userCont = require('../controllers/userCont');
const { validateUser } = require('../validation/validSchema');
const { isAuthenticated } = require('../auth/utilites');

router.get('/', isAuthenticated, userCont.getAllUsers);
router.get('/:id', isAuthenticated, userCont.getUser);
router.post('/', isAuthenticated, validateUser, userCont.createUser);
router.put('/:id', isAuthenticated, validateUser, userCont.updateUser);
router.delete('/:id', isAuthenticated, userCont.deleteUser);

module.exports = router;