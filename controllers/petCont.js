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
    const petId = new ObjectId(req.params.id);
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
        id: req.body.id,
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        adoption_status: req.body.adoption_status,
        descripiton: req.body.description,
        image: req.body.image,
    };
    const result = await mongodb.getDb().collection('pets').insertOne(pet);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePet = async (req, res) => {
    try{
        const petId = new ObjectId(req.params.id);
        const pet = {
            id: req.body.id,
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
            res.status(404).json({ message: 'Contact not found' });
          } else if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Contact updated successfully' });
          } else {
            res.status(304).json({ message: 'No changes made to the contact' });
          }
    } catch (error) {
        ('Error updating contact:', err.message);
        res.status(500).json({ message: 'An error occurred', error: err.message });
    }
};

const deletePet = async (req, res) => {
    const petId = new ObjectId(req.params.id);

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