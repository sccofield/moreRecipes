import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

// Set up the express app.
const app = express();

// Log every requests to the console.
app.use(logger('dev'));

// Parse incoming requests data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

export default app;
