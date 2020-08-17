const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session); // [3]

const usersRouter = require("./users/users-router.js");
const authRouter = require("./auth/auth-router");
const dbConnection = require("../database/connection.js"); // [3]
const protected = require("./middlewares/protected");

const { restart } = require("nodemon");

const server = express();

// [2]
const sessionConfiguration = {
  name: "monster",
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 10, // [2a] 10 minutes
    secure: process.env.COOKIE_SECURE || false, // [2b] if true, cooke is sent only over https
    httpOnly: true, // [2c] --> JavaScript cannot touch this cookie!
  },
  resave: false, // [2d]
  saveUninitialized: false, //  [2e] GDPR Compliance --> client should drive this <-- preference / guidelines set by company --> do not make this decision alone!
  store: new KnexSessionStore({
    //  [3]
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60, //  [3_]
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.use("/api/users", protected, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.get("/hash", (req, res) => {
  try {
    const password = req.headers.password;

    const rounds = process.env.HASH_ROUNDS || 8; // [1b]
    const hash = bcrypt.hashSync(password, rounds); //  [1a]
    res.status(200).json({ password, hash });
  } catch (err) {
    err.message
      ? res.status(500).json({ error: err.message })
      : res.status(500).json({ error: "something went wrong on our end" });
  }
});

module.exports = server;

//  [1]
//  [a]
//  --> [10:34] on Luis's Computer time
//  --> 2^12 --> higher the number, more security
//  [b]
//  --> smaller number in production so you don't slow things down
//  --> larger number in production to lock things up

//  [2]
//  [a]
//  [b]
//  --> LUIS OPINION: absolutely no reason for this to be false in production
//  --> [11:40 in YT]
//  [c]
//  [d]
//  [e]
