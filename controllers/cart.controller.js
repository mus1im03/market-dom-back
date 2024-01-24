const Cart = require("../models/Cart.model");

module.exports.cartController = {
  getCart: async (req, res) => {
    try {
      const cart = await Cart.find();
      res.json(cart);
    } catch (e) {
      return res.status(500).json({ error: 'Не удалось получить корзину', message: e.message });
    }
  },

  postCart: async (req, res) => {
    try {
      const { products, totalCash } = req.body;

      console.log('Received request with products:', products);
      console.log('Received request with totalCash:', totalCash);

      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Недопустимые входные данные' });
      }

      const cart = await Cart.create({ products, totalCash });
      res.json(cart);
    } catch (e) {
      return res.status(500).json({ error: 'Не удалось создать корзину', message: e.message });
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const { productId } = req.params;
  
      // Дополнительная валидация productId (пример для ObjectId)
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Недопустимые входные данные для productId' });
      }
  
      const cart = await Cart.findOneAndUpdate(
        { $pull: { products: { productId } } },
        { new: true }
      );
  
      if (!cart) {
        return res.status(404).json({ error: 'Товар не найден в корзине' });
      }
  
      res.json(cart);
    } catch (e) {
      console.error(e); // Логирование ошибок
      res.status(500).json({ error: 'Не удалось удалить товар из корзины', message: e.message });
    }
  },

  inc: async (req, res) => {
    try {
      const { productId } = req.body;
  
      if (!productId) {
        return res.status(400).json({ error: 'Недопустимые входные данные' });
      }
  
      const cart = await Cart.findOneAndUpdate(
        { "products.productId": productId },
        { $inc: { "products.$.amount": 1 } },
        { new: true }
      );
  
      if (!cart) {
        return res.status(404).json({ error: 'Корзина или товар не найдены' });
      }
  
      res.json(cart);
    } catch (e) {
      return res.status(500).json({ error: 'Не удалось увеличить количество товара', message: e.message });
    }
  },

  deс: async (req, res) => {
    try {
      const { productId } = req.body;
  
      if (!productId) {
        return res.status(400).json({ error: 'Недопустимые входные данные' });
      }
  
      const cart = await Cart.findOneAndUpdate(
        { "products.productId": productId, "products.amount": { $gt: 0 } },
        { $inc: { "products.$.amount": -1 } },
        { new: true }
      );
  
      if (!cart) {
        return res.status(404).json({ error: 'Корзина или товар не найдены или количество товара уже минимальное' });
      }
  
      res.json(cart);
    } catch (e) {
      return res.status(500).json({ error: 'Не удалось уменьшить количество товара', message: e.message });
    }
  },
};

