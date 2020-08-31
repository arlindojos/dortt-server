import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { config } from 'dotenv';

config({ path: '.env3' })

const app = express();

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(process.env.HTTP_PORT || 3001);
