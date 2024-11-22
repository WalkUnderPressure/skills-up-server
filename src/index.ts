import "../loadEnvironment.mjs";

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Important load db first to apply mongoose plugins before model will be loaded
import connectDB from './db';
// then import schemas
import profilesRouter from './api/ProfilesRouter';
import commentsRouter from './api/CommentsRouter';
import postsRouter from './api/PostsRouter';
import authRouter from './api/AuthRouter';

// Import middlewares
import loggerMiddleware from "./middlewares/logger";
import authMiddleware from "./middlewares/auth";

const app = express();

app.use(cors());
app.use(express.json());

// Add requests logger
app.use(loggerMiddleware);

app.get('/', (req, res) => {
  return res.send("skills-up-server working!");
});

app.use('/auth', authRouter);

app.use(authMiddleware).use('/profiles', profilesRouter);
app.use(authMiddleware).use('/comments', commentsRouter);
app.use(authMiddleware).use('/posts', postsRouter);

const PORT = process.env.PORT || 7000;

async function startup() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`>>> Server is running at: http://localhost:${PORT}`);
  });
}

// start server
startup();
