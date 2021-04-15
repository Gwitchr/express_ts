import express,{Router} from 'express';
import * as brandCtrl from '../../controllers/brand';

const app:Router = express.Router();

app.route("/brands").get(brandCtrl.listBrands)
app.route("/brands/:id_brand").get(brandCtrl.getOneBrand)

export default app;
