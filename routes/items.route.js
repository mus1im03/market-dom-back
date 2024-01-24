const { Router } = require('express')
const { itemsController } = require('../controllers/items.controller')
const authMiddleware = require('../models/middlewares/auth.middleware')
const imgMiddleware = require('../models/middlewares/img.middleware')

const router = Router();

router.get('/items', itemsController.getItems);
router.post('/items', imgMiddleware.single('img'), itemsController.postItem);
router.delete('/items/:id', authMiddleware, itemsController.deleteItem);
router.patch('/items/:id', itemsController.patchItem);

module.exports = router;