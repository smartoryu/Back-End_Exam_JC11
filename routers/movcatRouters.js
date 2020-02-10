const router = require("express").Router();
const { movcatController } = require("../controllers");

router.get("/", movcatController.getMovcat);

router.post("/add", movcatController.addMovcat);
router.delete("/delete", movcatController.deleteMovcat);

module.exports = router;
