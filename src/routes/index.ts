import express, { Response, Router } from 'express';

// public
import { Auth, Brand } from './public';
// private
// import AuthP from "./private/auth";
import { BrandP, Upload } from './private';

import { generalAuth } from '../middlewares/auth';

const API_PRIVATE: string = '/v1/private';
const API_PUBLIC: string = '/v1/public';
const API = '/v1';

const router: Router = express.Router();
router.get('/', (res: Response) => {
  res.send('N12 Brand Guidelines Development');
});

router.use(API_PRIVATE, generalAuth);

router.get(API, (res: Response) => {
  res.send('N12 Brand Guidelines API');
});

//  private
// router.use(API_PRIVATE, AuthP);
router.use(API_PRIVATE, Upload);
router.use(API_PRIVATE, BrandP);

// public

router.use(API_PUBLIC, Auth);
router.use(API_PUBLIC, Brand);

export default router;
