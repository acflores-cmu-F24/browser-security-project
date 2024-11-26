import { createServer } from 'node:http';
import express from 'express';
import path from 'path';
import loginRouter from "./routes/login.js"
import chatRouter from "./routes/chat.js"

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.resolve('server', 'views'));
app.use(express.static('client'));

app.use('/', loginRouter);
app.use('/', chatRouter);

const server = createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
