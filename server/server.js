import { createServer } from 'node:http';
import express from 'express';
import session from 'express-session';
import path from 'path';
import loginRouter from "./controllers/userController.js"
import chatRouter from "./controllers/chatController.js"
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { Server } from 'socket.io';
//import MongoStore from 'connect-mongo';


const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

const configureCookie = (cookieMaxAge) => {
  return session({
    name: 'identityKey',
    secret: 'chocolate_chip',
    saveUninitialized: false,
    resave: false,
    // store: MongoStore.create({
    //   mongoUrl: 'mongodb://localhost:27017/browsersecurity',
    //   ttl: 24 * 60 * 60,
    // }),
    cookie: {
      maxAge: cookieMaxAge
    },
  });
};

app.use(configureCookie(100 * 60 * 1000));

(async () => {
  mongoose
  .connect(`mongodb://localhost:27017/browsersecurity`)
  .then(() => console.log("Successfully connect to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB: ", error.message))
})();

app.set('view engine', 'ejs');
app.set('views', path.resolve('server', 'views'));
app.use(express.static('client'));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())


app.use('/', loginRouter);
app.use('/', chatRouter);

io.on('connection', (socket) => {
  socket.on('newChat', (messageData) => {
    io.emit('chatUpdate', messageData);
  });
})



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
