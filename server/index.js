const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");

const route = require("./routes");

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
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = require("./models");

// Routers
route(app);

db.sequelize.sync().then(() => {
  app.listen("3001", () => {
    console.log("Server running on port 3001!");
  });
});
