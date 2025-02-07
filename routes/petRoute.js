const router = require('express').Router();
const petCont = require('../controllers/petCont');

router.get('/', petCont.getAllPets);
router.get('/:id', petCont.getPet);
router.post('/', petCont.createPet);
router.put('/:id', petCont.updatePet);
router.delete('/:id', petCont.deletePet);

module.exports = router;