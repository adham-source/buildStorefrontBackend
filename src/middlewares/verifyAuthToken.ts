import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configs from '../configs';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers['x-auth-token'] as string;
    const token = authorizationHeader.split(' ')[1];
    if (token === null || !token) {
      res.status(401).json({
        success: false,
        message: 'Access denied.',
      });
      return;
    }

    jwt.verify(
      token,
      configs.TOKEN_SECRET as string,
      (err: null | jwt.JsonWebTokenError, user: jwt.JwtPayload | undefined | string): void => {
        if (err) {
          res.status(403).json({
            success: false,
            message: 'Access denied.',
          });
          return;
        }
        //@ts-ignore
        req.user = user;
        next();
      },
    );
  } catch {
    res.status(403).json({
      success: false,
      message: 'Access denied.',
    });
  }
};

export default verifyAuthToken;
