import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { USER_ROLES } from '../constants/user_roles';
import { IToken } from '../types';

dotenv.config();

const verifyKey = process.env.SECRET_KEY || '';

// Explicitly not declaring return types for middleware

export const generalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { authorization }
  } = req;
  try {
    if (!authorization) {
      res.status(403).send({ error: 'Not authorized to access this resource' });
    }
    const [first, second] = authorization ? authorization.split(' ') : ['', ''];
    let jwtData = null;
    if (first === 'JWT' && second !== '') {
      jwtData = jwt.verify(second, verifyKey);
    } else {
      res.status(412).send({ error: 'Token is not constructed right' }); //TODO: check phrasing - make this enum
    }
    res.locals.user = jwtData ? (jwtData as IToken).user : null;
    next();
  } catch (error) {
    // res.status(401).send({ error: 'Not authorized to access this resource' });
    next(error);
  }
};

export const user_credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = res.locals;
  if (user) {
    next();
  } else {
    res.status(401).json({
      message: 'Uanuthorized user'
    });
  }
};

export const manager_credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = res.locals;
  if (user) {
    if (user.role === USER_ROLES.ADMIN || user.role === USER_ROLES.MANAGER) {
      next();
    } else {
      res.status(401).json({
        message: 'Uanuthorized user'
      });
    }
  } else {
    res.status(403).json({
      message: 'Invalid credentials'
    });
  }
};

export const admin_credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = res.locals;
  if (user) {
    if (user.role === USER_ROLES.ADMIN) {
      next();
    } else {
      res.status(401).json({
        message: 'Uanuthorized user'
      });
    }
  } else {
    res.status(403).json({
      message: 'Invalid credentials'
    });
  }
};
