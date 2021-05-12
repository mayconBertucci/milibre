import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers;
    if (!token) {
      return res.status(400).json({message: 'Not Authorized'});
    }
    
    const payload = verify(token.authorization, process.env.JWT_SECRET);
    req.body = payload;
    next();

  } catch (err) {
    console.error(err.message);
    return res.status(400).json('Invalid Token');
  }
};
