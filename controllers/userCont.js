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

module.exports = { getAllUsers };