const usersRouter = require("./users");
const productsRouter = require("./products");

function route(app) {
  app.use("/users", usersRouter);
  app.use("/products", productsRouter);
}

module.exports = route;
