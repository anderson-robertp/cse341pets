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
    const userId = new ObjectId(req.params.id);
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
            id: req.body.id,
            username: req.body.username,
            email: req.body.email,
            github_id: req.body.github_id,
            profile_url: req.body.profile_url,
            avatar_url: req.body.avatar_url,
            password: req.body.password,
        };
        const result = await mongodb.getDb().collection('users').insertOne(user);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}

const updateUser = async (req, res) => {
    try{
        const userId = new ObjectId(req.params.id);
        const user = {
            id: req.body.id,
            username: req.body.username,
            email: req.body.email,
            github_id: req.body.github_id,
            profile_url: req.body.profile_url,
            avatar_url: req.body.avatar_url,
            password: req.body.password,
        };
        const result = await mongodb.getDb().collection('users').replaceOne({ _id: userId }, user);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try{
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('users').remove({ _id: userId }, true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(204).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };