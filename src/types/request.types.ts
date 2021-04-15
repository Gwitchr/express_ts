import { Request } from 'express';
import { IUserRequest } from './';

export interface IRequestAuth extends Request {
  body: {
    email: string;
    password: string;
    user_id: string;
    validation_code: string;
  };
  user: IUserRequest | null;
}
