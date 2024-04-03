const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const ratesRouter = require("./rates");
const blogsRouter = require("./blogs");
const likesRouter = require("./likes");
const commentsRouter = require("./comments");

function route(app) {
  app.use("/users", usersRouter);
  app.use("/products", productsRouter);
  app.use("/orders", ordersRouter);
  app.use("/comments", commentsRouter);
  app.use("/likes", likesRouter);
  app.use("/blogs", blogsRouter);
  app.use("/rates", ratesRouter);
}

module.exports = route;
