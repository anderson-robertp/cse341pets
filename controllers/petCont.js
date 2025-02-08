const { response } = require('express');
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllPets = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('pets').find();
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
    const result = await mongodb.getDb().collection('pets').find({ _id: petId });
    result.toArray().then((lists) => {
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createPet = async (req, res) => {
  try {
    const pet = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        adoption_status: req.body.adoption_status,
        descripiton: req.body.description,
        image: req.body.image,
    };

    const result = await mongodb.getDb().collection('pets').insertOne(pet);

    if (result.acknowledged) {
      // Include the insertedId in the response
      res.status(201).json({ message: 'pet created successfully', id: result.insertedId });
      //console.log(result); // For testing/logging purposes
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
        const result = await mongodb.getDb().collection('pets').replaceOne({ _id: petId }, pet);

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
    const petId = req.params.id;

    const result = await mongodb.getDb().collection('pets').deleteOne({ _id: petId });

    if (result.deletedCount > 0) {
      res.status(204).json({ message: 'Pet deleted successfully' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
}

module.exports = {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet
};