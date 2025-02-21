const router = require('express').Router();
const petCont = require('../controllers/petCont');
const { validatePet } = require('../validation/validSchema');
const { isAuthenticated } = require('../auth/utilites');

router.get('/', isAuthenticated, petCont.getAllPets);
router.get('/:id', isAuthenticated, petCont.getPet);
router.post('/', isAuthenticated, validatePet, petCont.createPet);
router.put('/:id', isAuthenticated, validatePet, petCont.updatePet);
router.delete('/:id', isAuthenticated, petCont.deletePet);

module.exports = router;