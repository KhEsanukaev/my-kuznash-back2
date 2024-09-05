const Cart = require('../models/Cart.model');
const Carpets = require('../models/Carpet.model');
const { log } = require('console');

module.exports.cartController = {
  getCart: async (req, res) => {
    try {
      const { cartId } = req.params;
      const cart = await Cart.findById(cartId).populate('items.carpetId');

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      return res.json(cart);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },

  getCarts: async (req, res) => {
    try {
      const cart = await Cart.find();

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      return res.json(cart);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },


  addToCart: async (req, res) => {
    const { cartId, carpetId, quantity } = req.body;

    try {
      const carpet = await Carpets.findById(carpetId);
      if (!carpet) {
        return res.status(404).json({ message: 'Carpet not found' });
      }

      let cart = await Cart.findById(cartId);

      if (!cart) {
        cart = new Cart({ items: [] });
      }

      const itemIndex = cart.items.findIndex(item => item.carpetId.equals(carpetId));

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ carpetId, quantity });
      }

      await cart.save();

      // Update carpet stock
      carpet.stock -= quantity;
      await carpet.save();

      return res.json(cart);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },

  removeFromCart: async (req, res) => {
    const { cartId, carpetId } = req.body;

    try {
      const cart = await Cart.findById(cartId);
      console.log(cartId);

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const itemIndex = cart.items.findIndex(item => item.carpetId.equals(carpetId));

      if (itemIndex > -1) {
        const removedItem = cart.items[itemIndex];

        // Restore carpet stock
        const carpet = await Carpets.findById(removedItem.carpetId);
        carpet.stock += removedItem.quantity;
        await carpet.save();

        cart.items.splice(itemIndex, 1);
        await cart.save();

        return res.json(cart);
      } else {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
};
