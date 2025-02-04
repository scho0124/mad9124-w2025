const { Router } = require("express");

const userController = require("../controllers/users");
const validateUserData = require("../middleware/validateUserData");

const router = Router();

router.post("/", validateUserData(true), userController.create);
router.get("/", userController.getAll);

module.exports = router;
