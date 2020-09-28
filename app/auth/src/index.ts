import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { meRouter } from './routes/me';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  }),
);

app.use(meRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

const bootstrap = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(3000, () => {
      console.log('Listening on 3000!!!');
    });
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
