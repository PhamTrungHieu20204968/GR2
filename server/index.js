const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("./passport");
require("dotenv").config();
const route = require("./routes");
const { connectSocket } = require("./socketIo");
app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Set 'X-Frame-Options' header to 'SAMEORIGIN'
// app.use((req, res, next) => {
//   res.setHeader("X-Frame-Options", "SAMEORIGIN");
//   next();
// });

const db = require("./models");

// Routers
route(app);

db.sequelize.sync().then(() => {
  const server = app.listen("3001", () => {
    console.log("Server running on port 3001!");
  });
  connectSocket(server);
});
