const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('users').find();
    result.toArray().then((lists) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await mongodb.getDb().collection('users').find({ _id: userId });
    result.toArray().then((lists) => {
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createUser = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            github_id: req.body.github_id,
            profile_url: req.body.profile_url,
            avatar_url: req.body.avatar_url,
            password: req.body.password,
        };
        const result = await mongodb.getDb().collection('users').insertOne(user);

        if (result.acknowledged) {
      // Include the insertedId in the response
        res.status(201).json({ message: 'User created successfully', id: result.insertedId });
        console.log(result); // For testing/logging purposes
        } else {
        res.status(500).json({ message: 'Error creating User' });
        }
    } catch (error) {
    console.error('Error while creating user:', error);
    res.status(500).json({ message: 'An error occurred', error });
    }
}

const updateUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = {
            username: req.body.username,
            email: req.body.email,
            github_id: req.body.github_id,
            profile_url: req.body.profile_url,
            avatar_url: req.body.avatar_url,
            password: req.body.password,
        };
        const result = await mongodb.getDb().collection('users').replaceOne({ _id: userId }, user);

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'User not found' });
        } else if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(304).json({ message: 'No changes made to the User' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = new req.params.id;

        const result = await mongodb.getDb().collection('users').remove({ _id: userId }, true);

        if (result.deletedCount > 0) {
            res.status(204).json({ message: 'User deleted successfully' });
        } else {
            res.status(500).json(response.error || { message: 'Error deleting user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };