const express = require('express');
const router = express.Router();
const { cartController } = require('../controllers/carts.controller');

// Маршрут для получения содержимого корзины
router.get('/cart/:cartId', cartController.getCart);

router.get('/cart', cartController.getCarts);

// Маршрут для добавления товара в корзину
router.post('/cart/add', cartController.addToCart);

// Маршрут для удаления товара из корзины
router.post('/cart/remove', cartController.removeFromCart);

module.exports = router;
