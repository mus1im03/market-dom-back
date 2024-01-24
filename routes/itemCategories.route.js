const { Router } = require('express')
const { itemCategoriesController } = require('../controllers/itemCategories.controller')
const authMiddleware = require('../models/middlewares/auth.middleware')

const router = Router();

router.get('/itemcategories', itemCategoriesController.getItemCategories);
router.post('/itemcategories', itemCategoriesController.postItemCategory);
router.delete('/itemcategories/:id', itemCategoriesController.deleteItemCategory);
// router.patch('/news/:id', authMiddleware, newsController.patchNews);

module.exports = router;