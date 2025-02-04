const validateUserData = (requireAll) => (req, res, next) => {
  const { name, email } = req.body;

  const errors = [];

  if (requireAll && !name) errors.push("Name is required.");
  if (requireAll && !email) errors.push("Email is required.");

  if (errors.length) {
    res.status(400).json({
      errors,
    });
    return;
  }
  next();
};

module.exports = validateUserData;
