require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const errorMiddleware = require('./middlewares/error.middleware')
const cookieParser = require('cookie-parser')
const path = require('path')
const { Server } = require('socket.io')
const http = require('http')


const PORT = process.env.PORT || 3001
const app = express();
const server = http.createServer(app)


const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
})


let users = [];

const addUser = (userId,fullName,avatar,socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId,fullName,avatar, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const user = users.find((user) => user.userId === userId);
  return user
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", ({userId,fullName,avatar}) => {
    addUser(userId,fullName,avatar,socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ sender,receiverId,author,avatar,text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      sender,
      author,
      avatar,
      text,
    });
  });
    

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


app.use('/images', express.static(path.join(__dirname, 'images')))
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.use('/api', require('./routes/auth.router'), errorMiddleware)
app.use('/api', require('./routes/profile.router'), errorMiddleware)
app.use('/api', require('./routes/payment.router'), errorMiddleware)
app.use('/api', require('./routes/invetsment.router'), errorMiddleware)
app.use('/api', require('./routes/admin.router'), errorMiddleware)
app.use('/api', require('./routes/conversation.router'), errorMiddleware)
app.use('/api', require('./routes/message.router'), errorMiddleware)


function start() {
  try {
    mongoose.connect(process.env.MONGO_CONN_STR, console.log('Mongo DB connected'));
    server.listen(5000, console.log(`Server connected on PORT: ${PORT}`))
  } catch (e) {
    console.log('Server connection Error', e)
  }
}

start();