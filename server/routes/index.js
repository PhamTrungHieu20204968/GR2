const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const ratesRouter = require("./rates");

function route(app) {
  app.use("/users", usersRouter);
  app.use("/products", productsRouter);
  app.use("/orders", ordersRouter);
  app.use("/rates", ratesRouter);
}

module.exports = route;
