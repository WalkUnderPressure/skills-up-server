import { Request, Response, NextFunction } from 'express';

// [Use as middleware] Check user authorization (now simple, update in future)
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ status: 403, message: 'Authorization required!' });
  }

  next();
};

export default authMiddleware;
