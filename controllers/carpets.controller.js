const Carpets = require("../models/Carpet.model");

module.exports.carpetsController = {
  getCarpets: async (req, res) => {
    try {
      const carpets = await Carpets.find().populate("categoryId");
      return res.json(carpets);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  },

  getCarpetById: async (req, res) => {
    const { id } = req.params;
    try {
      const carpet = await Carpets.findById(id).populate("categoryId");
      if (!carpet) {
        return res.status(404).json({ message: "Carpet not found" });
      }
      return res.json(carpet);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  },

  addCarpets: async (req, res) => {
    const { image, name, size, price, description, stock, categoryId } = req.body;
    try {
      const carpets = await Carpets.create({
        image,
        name,
        size,
        description,
        price,
        stock,
        categoryId,
      });
      return res.json(carpets);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  },

  updateCarpets: async (req, res) => {
    const { id } = req.params;
    const { image, name, size, price, description, stock, categoryId } = req.body;
    try {
      const updatedCarpet = await Carpets.findByIdAndUpdate(
        id,
        { image, name, size, price, description, stock, categoryId },
        { new: true }
      );
      if (!updatedCarpet) {
        return res.status(404).json({ message: "Carpet not found" });
      }
      return res.json(updatedCarpet);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  },

  deleteCarpets: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCarpets = await Carpets.findByIdAndDelete(id);
      if (!deletedCarpets) {
        return res.status(404).json({ message: "Carpet not found" });
      }
      return res.json({ message: "Carpet deleted successfully" });
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
