const router = require("express").Router();
const { authController } = require("../controllers");

router.get("/hashpassword", authController.hashpassword);
router.get("/check", authController.checkUsername);

router.get("/login", authController.login);
router.get("/login/:id", authController.login);

router.post("/register", authController.register);

module.exports = router;
