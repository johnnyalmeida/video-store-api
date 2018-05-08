import express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';
import datasource from './config/datasource';
import moviesRouter from './routes/movies';
import usersRouter from './routes/users';
import movieRentsRouter from './routes/movieRents';
import authRouter from './routes/auth';
import authentication from './auth';

const app = express();

app.config = config;
app.datasource = datasource(app);

const auth = authentication(app);

app.use(bodyParser.json());
app.use(auth.initialize());

app.auth = auth;

app.set('port', 7000);

moviesRouter(app);
usersRouter(app);
movieRentsRouter(app);
authRouter(app);

export default app;
