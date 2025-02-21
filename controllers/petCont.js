const { response } = require('express');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllPets = async (req, res) => {
  try {
    const result = await mongodb
    .getDb()
    .collection('pets')
    .find();
    
    result.toArray().then((lists) => {
      //res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPet = async (req, res) => {
  try {
    const petId = req.params.id;
    console.log(petId);

    const result = await mongodb.getDb().collection('pets').findOne({_id: new ObjectId(petId)});
    console.log(result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createPet = async (req, res) => {
  try {
    // Validate required fields
    const { name, species, breed, age, adoption_status, description, image_url } = req.body;
    //console.log(req.body);

    if (!name || !species || !breed) {
      return res.status(400).json({ message: 'Missing required fields: name, species, or breed' });
    }

    // Check if pet with the same name already exists
    const existingPet = await mongodb.getDb().collection('pets').findOne({ name });
    console.log(`Existing Pet:${existingPet} Input:${name}`);
    if (existingPet) {
      if (existingPet.name === name && existingPet.species === species) {
        return res.status(409).json({ message: 'Pet with the same name already exists' });
      }
    }
      

    const pet = {
      name,
      species,
      breed,
      age: age || null,
      adoption_status: adoption_status || 'available',
      description: description || '',
      image_url: image_url || '',
      created_at: new Date(),
    };

    const result = await mongodb.getDb().collection('pets').insertOne(pet);

    if (result.acknowledged) {
      res.status(201).json({ message: 'Pet created successfully', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating pet' });
    }
  } catch (error) {
    console.error('Error while creating pet:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};

const updatePet = async (req, res) => {
    try{
        const petId = req.params.id;
        const pet = {
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            adoption_status: req.body.adoption_status,
            descripiton: req.body.description,
            image: req.body.image,
        };
        const result = await mongodb.getDb().collection('pets').replaceOne( {_id: new ObjectId(petId)} , pet);

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'pet not found' });
          } else if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'pet updated successfully' });
          } else {
            res.status(304).json({ message: 'No changes made to the pet' });
          }
    } catch (error) {
        ('Error updating pet:', err.message);
        res.status(500).json({ message: 'An error occurred', error: err.message });
    }
};

const deletePet = async (req, res) => {
  try {
    const petId = req.params.id;
    //console.log("PetId: " + petId);

    if (!ObjectId.isValid(petId)) {
      return res.status(400).json({ message: 'Invalid pet ID' });
    }

    const result = await mongodb
      .getDb()
      .collection('pets')
      .deleteOne({_id: new ObjectId(petId)});
    //console.log(result);

    if (result.deletedCount > 0) {
      res.status(204).json({ message: 'Pet deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  }  
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet
};