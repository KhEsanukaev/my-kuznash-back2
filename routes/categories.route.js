const { Router } = require("express");
const authMiddleware = require("../middlewear/auth.middleware");
const { categoriesController } = require("../controllers/categories.controller");
const router = Router();

router.post('/categories', authMiddleware, categoriesController.createCategories);
router.delete('/categories/:id', authMiddleware, categoriesController.deleteCategories);
router.get('/categories', categoriesController.getAllCategories);
router.delete('/categories', authMiddleware, categoriesController.deleteAllCategories);

module.exports = router;
