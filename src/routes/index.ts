import checkout from './checkout';
import twilio from './twilio';
import { Router } from 'express';

const routes = Router();

// Server ping
routes.get('/', (req, res) =>
  res.send(`Server is running in ${process.env.NODE_ENV} mode!`)
);

// Routes
routes.use('/checkout', checkout);
routes.use('/twilio', twilio);

// 404
routes.all('*', (req, res) => res.status(404).send('404 route not found.'));

export default routes;
