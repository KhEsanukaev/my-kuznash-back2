const Categories = require("../models/Category.model");

module.exports.categoriesController = {
  createCategories: async (req, res) => {
    try {
      const data = await Categories.create({
        text: req.body.text,
      });
      return res.json(data);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },

  deleteCategories: async (req, res) => {
    try {
      const data = await Categories.findByIdAndDelete(req.params.id);
      return res.json(data);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },

  deleteAllCategories: async (req, res) => { // Обратите внимание на корректное название метода
    try {
      await Categories.deleteMany();
      return res.json({ message: "Все категории удалены" });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const data = await Categories.find();
      return res.json(data);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  },
};
