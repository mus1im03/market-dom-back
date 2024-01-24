const ItemCategory = require("../models/ItemCategory.model");

module.exports.itemCategoriesController = {
  getItemCategories: async (req, res) => {
    const itemCategories = await ItemCategory.find();

    res.json(itemCategories);
  },

  deleteItemCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const itemCategory = await ItemCategory.findById(id);

      if (itemCategory.user.toString() === req.user.id) {
        await Item.findByIdAndRemove(id);
        
         return res.json("deleted");
      }

      return res.status(401).json("Ошибка нет доступа");
    } catch (e) {
      return res.json("Ошибка: " + e.toString());
    }
  },

  postItemCategory: async (req, res) => {
    const { title, categoryId } = req.body;

    try {
      const itemCategory = await ItemCategory.create({ title, categoryId });
      await res.json(itemCategory);
    } catch (e) {
      return res.status(401).json(e.toString());
    }
  },

  // patchNews: async (req, res) => {
  //   try {
  //     const news = await News.findByIdAndUpdate(
  //       req.params.id,
  //       { completed: !req.body.completed },
  //       { new: true }
  //     );
  //     res.json(news);
  //   } catch (error) {
  //     res.json(error);
  //   }
  // },
};