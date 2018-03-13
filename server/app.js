import express from 'express';
import path from 'path';
import logger from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import config from 'dotenv';
import routes from './routes';
import webpackConfig from '../webpack.dev';

import swaggerDocument from './converted.json';

config.config();

// Set up the express app.
const app = express();
// Log every requests to the console.
app.use(logger('dev'));

// Parse incoming requests data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

app.use(express.static(path.resolve(__dirname, '../client/public')));

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
}

app.all('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

export default app;
