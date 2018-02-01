import express from 'express';
import path from 'path';
import logger from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import bodyParser from 'body-parser';
import config from 'dotenv';
import routes from './routes';
import webpackConfig from '../webpack.config';

config.config();

// Set up the express app.
const app = express();
console.log('===============', 'am out', process.env.NODE_ENV);
app.use(express.static(path.resolve(__dirname, '../client/public')));

if (process.env.NODE_ENV === 'development') {
  console.log('===============', 'am here');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
}


// Log every requests to the console.
app.use(logger('dev'));

// Parse incoming requests data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

routes(app);

export default app;
