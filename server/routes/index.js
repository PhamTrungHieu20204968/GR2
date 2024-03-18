const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");

function route(app) {
  app.use("/users", usersRouter);
  app.use("/products", productsRouter);
  app.use("/orders", ordersRouter);
}

module.exports = route;
