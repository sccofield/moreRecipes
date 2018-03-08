// This will be our application entry. We'll setup our server here.
import http from 'http';
import app from '../app'; // The express app we just created
import db from '../models';

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

db.sequelize.sync().then(() => {
  const server = http.createServer(app);
  server.listen(port, () => {
  });
});
