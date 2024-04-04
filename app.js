const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const PORT = process.env.PORT || 5001;
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");
const RateLimiter = require("express-rate-limit");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const messageRoutes = require("./routes/messageRoutes");
const methodOverride = require("method-override");
const indexRoutes = require("./routes/indexRoutes");
const passport = require("passport");
const passportSetup = require("./config/passport");
const flash = require("express-flash");

// App && DB connection

const app = express();
dbConnect();

// view engine

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

// flash

app.use(flash());
// session setup

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collection: "session",
    }),
  })
);

// Passport Setup

passportSetup(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));

// logger

app.use(morgan("dev"));

// rate limiter

const limiter = RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// routes

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/board", boardRoutes);
app.use("/messages", messageRoutes);

// error handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// listen

app.listen(PORT, () => {
  console.log(`App running on Port: ${PORT}`);
});
