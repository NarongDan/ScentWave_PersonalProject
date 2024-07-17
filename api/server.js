const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authRouter = require("./routes/auth-route");
const productRouter = require("./routes/product-route");
const { authenticate } = require("./middlewares/authenticate");
const userRouter = require("./routes/user-route");
const billRouter = require("./routes/bill-route");
const cartRouter = require("./routes/cart-route");
const utilsRouter = require("./routes/utils-route");

app.use(cors());
app.use("/utils", utilsRouter); // ต้องมาก่อน 2 ตัวล่าง
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/users", authenticate, userRouter);
app.use("/bills", authenticate, billRouter);
app.use("/carts", cartRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`This server is running on port:${PORT}`));
