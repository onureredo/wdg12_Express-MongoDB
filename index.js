import express from 'express';
import './db/server.js';
import { errorHandler } from './middlewares/ErrorHandler.js';
import booksRouter from './routes/booksRouter.js';

const app = express();
const port = 8000;

app.use(express.json());

app.use('/books', booksRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
