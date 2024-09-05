require("dotenv").config();
const cors = require("cors");
const path = require("path");

const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.resolve(__dirname, "images")));

// Подключите маршруты
app.use(require("./routes/carpets.route"));
app.use(require("./routes/categories.route"));
app.use(require("./routes/carts.route")); // Новые маршруты корзины

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('ok'))
.catch((err) => console.log('error', err));

app.listen(3000, () => console.log("Сервер запущен!"));
