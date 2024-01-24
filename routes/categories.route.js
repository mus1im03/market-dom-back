const { Router } = require('express')
const { categoriesController } = require('../controllers/categories.controller')
const authMiddleware = require('../models/middlewares/auth.middleware')

const router = Router();

router.get('/categories', categoriesController.getCategories);
router.post('/categories', categoriesController.postCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);
// router.patch('/news/:id', authMiddleware, newsController.patchNews);

module.exports = router;