import express from 'express';
import * as brandCtrl from '../../controllers/brand';
import { manager_credentials } from '../../middlewares/auth';

const app = express.Router();

app.route('/brands').post(manager_credentials, brandCtrl.createBrand);
// get in public

app.route('/brands/:brand_id').put(manager_credentials, brandCtrl.updateBrand);
// get in public

export default app;
