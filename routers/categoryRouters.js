const router = require("express").Router();
const { categoryController } = require("../controllers");

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.getCategory);
router.get("/page/:page", categoryController.getCategory);

router.post("/add", categoryController.addCategory);
router.put("/edit/:id", categoryController.editCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
