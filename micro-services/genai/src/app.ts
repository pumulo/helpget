import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { aboutRouter, queryRouter } from './routes';

const app = express();

const cors = require('cors');
const corsOptions = {
    origin: '*',
  
    methods: [
        'GET',
        'POST',
        'DELETE',
        'PATCH'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
    // credentials: true

  };
app.use(cors(corsOptions));
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession(
        {
            signed: false
        }
    )
)

// TODO add all the routes that we define here
app.use(aboutRouter);
app.use(queryRouter);

app.all('*', () => {
    throw new Error('Unable to reach this url. no functionality has been defined');
});

export { app };