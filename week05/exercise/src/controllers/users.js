const users = require("../models/users.json");

// CREATE
// create a new user
const create = (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: Date.now(),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json({
    data: newUser,
  });
};

// READ

const getAll = (_req, res) => {
  res.status(200).json({
    data: users,
  });
};

module.exports = {
  create,
  getAll,
};
