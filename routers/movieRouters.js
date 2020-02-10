const router = require("express").Router();
const { movieController } = require("../controllers");

router.get("/", movieController.getMovie);
router.get("/:id", movieController.getMovie);

router.post("/add", movieController.addMovie);
router.put("/edit/:id", movieController.editMovie);
router.delete("/delete/:id", movieController.deleteMovie);

module.exports = router;
