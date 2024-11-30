import { createServer } from 'node:http';
import express from 'express';
import path from 'path';
import loginRouter from "./controllers/userController.js"
import chatRouter from "./controllers/chatController.js"
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const server = createServer(app);

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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
