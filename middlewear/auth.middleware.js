// middleware/auth.middleware.js

const jwt = require('jsonwebtoken'); // Убедитесь, что вы установили jsonwebtoken
const secretKey = 'my$uper$ecretKeyForJWT@1234567890!abcdEFGHijklMNOPqrstUVWXyz'; // Замените на ваш секретный ключ

// Middleware для проверки JWT
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = decoded; // Сохраняем декодированную информацию о пользователе в запросе
        next(); // Переходим к следующему middleware или маршруту
    });
};

module.exports = authMiddleware;
