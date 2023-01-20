const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csurf = require('csurf');
const cors = require('cors');
const debug = require('debug')
const { isProduction } = require('./config/keys');


require('./models/User');
require('./models/Group');
require('./models/Dish');
require('./models/Restaurant');
require('./models/Message');
require('./models/FriendRequest');
require('./config/passport');

const passport = require('passport');
const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');
const messagesRouter = require('./routes/api/messages');
const restaurantRouter = require('./routes/api/restaurants');
const groupsRouter = require('./routes/api/groups');
const dishesRouter = require('./routes/api/dishes');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


if (!isProduction) {
    // Enable CORS only in development because React will be on the React
    // development server (http://localhost:3000). (In production, the Express
    // server will serve the React files statically.)
    app.use(cors());
  }

app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

app.use(passport.initialize());

app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/dishes', dishesRouter);



if (isProduction) {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}


// Express custom middleware for catching all unmatched requests and formatting
// a 404 error to be sent as the response.
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
  });

const serverErrorLogger = debug('backend:error');

  // Express custom error handler that will be called whenever a route handler or
  // middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
  });

  // io.on('connection', (socket) => {
  //   console.log('a user connected');
  // });
  
  // server.listen(3001, () => {
  //   console.log('listening on *:3001');
  // });

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is UP on PORT ${process.env.SERVER_PORT}`);
  console.log(`Visit  localhost:${5000}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Sockets are in action");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData.name, "connected");
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });
  socket.on("new message", (newMessage) => {
    var group = newMessage.messageLocation;
    if (!group.userIds[0]) return console.log("group.userIds not defined");

    group.userIds[0].forEach((user) => {
      // if (user === newMessage.sender._id) return;
      socket.in(user).emit("message received", newMessage);
    });
    socket.on("typing", (room) => {
      socket.in(room).emit("typing");
    });
    socket.on("stop typing", (room) => {
      socket.in(room).emit("stop typing");
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
  
})

module.exports = app;
