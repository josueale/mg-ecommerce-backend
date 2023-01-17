import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import express, { Application } from 'express';
import mongoose from 'mongoose';

import fileUpload from 'express-fileupload';
import morgan from 'morgan';

// DB Config
import { join } from 'path';

import corsConfig from '@Config/cors';
import { mongoURI } from '@Config/keys';

import * as api_v1 from '@Routes/api/v1';

const app: Application = express();

app.use(urlencoded({ limit: '1500mb', extended: true, parameterLimit: 50000 }));
app.use(json({ limit: '1000mb' }));

app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(compression());

// for future feature
// enable files uploads
app.use(fileUpload({ createParentPath: true }));

console.time('DB - connection');
// Connect to MongoDB
mongoose.set('strictQuery', false);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(
      `DB - Base de datos ${mongoURI.substring(
        mongoURI.lastIndexOf('/') + 1,
        mongoURI.length
      )} conectada`
    );
    console.timeEnd('DB - connection');
  })
  .catch(console.log);

const uploadsDir = join(__dirname, '../uploads');

app.use(express.static(uploadsDir));
// app.use(express.static( 'uploads'));

app.disable('x-powered-by');

// Routes
app.get('/', (_req, res) => {

  res.status(200).json({
    hola: 'mundo'
  })

});

app.use('/api/v1/users', api_v1.userRoutes);
app.use('/api/v1/products', api_v1.productRoutes);
app.use('/api/v1/cart', api_v1.cartRoutes);

//
app.use('/api/v1/analytics', api_v1.userRoutes);
app.use('/api/v1/search', api_v1.searchRoutes);

export default app;
