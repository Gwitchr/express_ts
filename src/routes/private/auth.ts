import express, { Router } from 'express';
import * as authCtrl from '../../controllers/auth';
import { user_credentials } from '../../middlewares/auth';

const app: Router = express.Router();

app.route('/auth/renew_token').get(user_credentials, authCtrl.renewToken);

export default app;
