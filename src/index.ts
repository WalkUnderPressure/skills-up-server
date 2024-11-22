import express, { Request, Response, NextFunction } from 'express';
import dotenv, { DotenvConfigOptions } from "dotenv";
import cors from 'cors';
import path from 'path';

const IS_DEV = Boolean(process.env.NODE_ENV === 'dev');

let dotEnvConfig: DotenvConfigOptions = {};

if (IS_DEV) {
  dotEnvConfig.path = path.resolve(__dirname, '..', '.env');
}

// setup env variables
dotenv.config(dotEnvConfig);

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
  return res.json({ message: "Welcome! 'skills-up-server' is working fine!" });
});

// temporary api-point
app.get("/favicon.ico", (req: Request, res: Response) => {
  return res.status(204).end(); // No content, but successful response
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

// if (IS_DEV) {
  // start server
  startup();
// }

export default (req: Request, res: Response) => {
  app(req, res);  // Pass the request and response to the Express app
};

// export default app;

// Export the app as a Vercel-compatible handler
// export default createServer(app);
