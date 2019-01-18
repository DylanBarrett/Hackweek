const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./Routes/api/users");
const tutors = require("./Routes/api/tutors");
const chat = require("./Routes/api/chat");

const app = express();
var socketio = require("socket.io");
var http = require("http");
var http = require('https');
var fs = require('fs');
var secretKey = fs.readFileSync('./server.key', 'utf8');
var certificate = fs.readFileSync('./derekrogers.me.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 3001;

/* * * * DB CONFIG * * * */

const config = require("./config.js");
mongoose.connect(
  "mongodb://" +
    config.user +
    ":" +
    config.pass +
    "@ds151293.mlab.com:51293/hackweek",
  {
    useMongoClient: true
  }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("DB connected");
});

/* * * * * API ROUTES * * * * * */
const router = express.Router();

router.use(function(req, res, next) {
  next();
});

app.use("/api/users", users);
app.use("/api/tutors", tutors);
app.use("/api/chat", chat);

var server = https.createServer(credentials, app);
var io = socketio(server);

server.listen(port, () => console.log("Listening on port " + port + "..."));

/* * * * WEBSOCKETS FOR MESSAGING * * * */
const Message = require("./models/message");
var clients = {};

io.on("connection", socket => {
  socket.on("chat message", data => {
    io.sockets
      .in(data.to)
      .emit("new message", { msg: data.msg, from: data.from });

    let message = new Message();
    message.to = data.to;
    message.from = data.from;
    message.msg = data.msg;
    message.createdAt = Date.now();

    message.save(err => {
      if (err) {
        console.log(err);
      }
    });
  });

  socket.on("join", data => {
    socket.join(data.userId);
  });
});
