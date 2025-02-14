const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

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
    //console.log("UserId: " + userId);

    const result = await mongodb.getDb().collection('users').findOne({ _id: new ObjectId(userId) });
    //console.log("Result: " +result);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createUser = async (req, res) => {
  try {
    const { username, email, github_id, profile_url, avatar_url, password } = req.body;
    //console.log("Username: " + username);

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if the user already exists
    const existingUser = await mongodb.getDb().collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      email,
      github_id: github_id || null,
      profile_url: profile_url || '',
      avatar_url: avatar_url || '',
      password: hashedPassword,
      created_at: new Date(),
    };

    const result = await mongodb.getDb().collection('users').insertOne(user);

    if (result.acknowledged) {
      res.status(201).json({ message: 'User created successfully', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating user' });
    }
  } catch (error) {
    console.error('Error while creating user:', error);
    res.status(500).json({ message: 'An error occurred', error });
  }
};

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