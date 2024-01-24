const { Router } = require('express');
const { cartController } = require('../controllers/cart.controller');
const authMiddleware = require('../models/middlewares/auth.middleware');

const router = Router();

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.postCart);
router.delete('/cart/remove/:id', cartController.deleteCartItem)
router.patch('/cart/increase', cartController.inc);
router.patch('/cart/decrease', cartController.deс);

module.exports = router;