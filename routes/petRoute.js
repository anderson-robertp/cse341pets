const router = require('express').Router();
const petCont = require('../controllers/petCont');
const { validatePet } = require('../validation/validSchema');

router.get('/', petCont.getAllPets);
router.get('/:id', petCont.getPet);
router.post('/', validatePet, petCont.createPet);
router.put('/:id', petCont.updatePet);
router.delete('/:id', petCont.deletePet);

module.exports = router;