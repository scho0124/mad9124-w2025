const { Router } = require("express");

const userController = require("../controllers/users");
const validateUserData = require("../middleware/validateUserData");

const router = Router();

// router.use((_req, _res, next) => {
//   console.log("this only applies to the user router");
//   next();
// });

router.post("/", validateUserData(true), userController.create);
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.put("/:id", validateUserData(true), userController.replace);
router.patch("/:id", validateUserData(false), userController.update);
router.delete("/:id", userController.deleteOne);

module.exports = router;
