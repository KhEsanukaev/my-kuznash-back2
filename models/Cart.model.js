const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  carpetId: { type: Schema.Types.ObjectId, ref: 'Carpet' },
  quantity: Number,
});

const cartSchema = new Schema({
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
