import "../loadEnvironment.mjs";

import express from 'express';
import cors from 'cors';

// Important load db first to apply mongoose plugins before model will be loaded
import connectDB from './db';
// then import schemas
import profilesRouter from './api/ProfilesRouter';
import commentsRouter from './api/CommentsRouter';
import postsRouter from './api/PostsRouter';
import authRouter from './api/AuthRouter';

const app = express();

app.use(cors());
app.use(express.json());

// Add requests logger
app.use((req, res, next) => {
  const { method, url, params, query, body } = req;

  console.info(`>>> url => ${JSON.stringify(url)}
    method => ${JSON.stringify(method)}
    params => ${JSON.stringify(params)}
    query => ${JSON.stringify(query)}
    body => ${JSON.stringify(body)}
  `);

  next();
})

// Check user authorization (now simple, update in future)
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ status: 403, message: 'Authorization required!' });
  }

  next();
});

app.get('/', (req, res) => {
  return res.send("skills-up-server working!");
});

app.use('/auth', authRouter);
app.use('/profiles', profilesRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 7000;

async function startup() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`>>> Server is running at: http://localhost:${PORT}`);
  });
}

// start server
startup();
