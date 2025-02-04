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

const getById = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === parseInt(userId, 10));

  if (!user) {
    res.status(404).json({
      error: `user with id ${userId} not found`,
    });
    return;
  }

  res.json({
    data: user,
  });
};

// replace all properties of a user
const replace = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === parseInt(id, 10));

  if (!foundUser) {
    res.status(404).json({
      error: `user with id ${id} not found`,
    });
    return;
  }

  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({
      error: "Name and Email required",
    });
  }

  foundUser.name = name;
  foundUser.email = email;

  res.json({
    data: foundUser,
  });
};

const update = (req, res) => {
  const userId = parseInt(req.params.id, 10);

  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res.status(404).json({
      error: `user with id ${userId} not found`,
    });
    return;
  }

  for (const key of ["name", "email"]) {
    if (req.body[key]) foundUser[key] = req.body[key];
  }

  res.json({
    data: foundUser,
  });
};

const deleteOne = (req, res) => {
  const userId = parseInt(req.params.id);

  const userIdx = users.findIndex(({ id }) => id === userId);

  if (userIdx < 0) {
    res.status(404).json({
      error: `user with id ${userId} not found`,
    });
    return;
  }

  const [deletedUser] = users.splice(userIdx, 1);

  res.json({
    data: deletedUser,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  replace,
  update,
  deleteOne,
};
