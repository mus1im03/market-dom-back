const Item = require("../models/Item.model");
// const jwt = require("jsonwebtoken");

module.exports.itemsController = {
  getItems: async (req, res) => {
    const item = await Item.find();

    res.json(item);
  },

  deleteItem: async (req, res) => {
    const { id } = req.params;

    try {
      const item = await Item.findById(id);

      if (item.user.toString() === req.user.id) {
        await Item.findByIdAndRemove(id);
        
         return res.json("deleted");
      }

      return res.status(401).json("Ошибка нет доступа");
    } catch (e) {
      return res.json("Ошибка: " + e.toString());
    }
  },

  postItem: async (req, res) => {
    const { title, description, price, left, inStok, itemCategoryId, articul, image } = req.body;

    try {
      const item = await Item.create({ title, description, price, image, left, inStok, itemCategoryId, articul });
      await res.json(item); 
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },

  patchItem: async (req, res) => {
    try {
      const item = await Item.findByIdAndUpdate(
        req.params.id,
        { title, description, price, img, left, inStok, itemCategoryId, articul },
      );
      await res.json(item);
    } catch (error) {
      res.json(error);
    }
  },
};