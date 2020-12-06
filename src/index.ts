import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import bodyParser from 'body-parser';
import routes from './routes';
import errorHandler from './errors/handler';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand(config());

const app = express();

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3001);
