import express, { Router, Response, Request } from 'express';
import * as awsCtrl from '../../controllers/aws';
import {
  user_credentials
  // admin_credentials
} from '../../middlewares/auth';

const app: Router = express.Router();

app
  .route('/upload/')
  .get((req: Request, res: Response) => {
    res.send({ response: 'image upload' });
  })
  .post(user_credentials, awsCtrl.singleImageUpload);

app.route('/upload/multiple').post(user_credentials, awsCtrl.multiImageUpload);

// app.route('/upload/music').post(
//   // user_credentials
//   awsCtrl.single_music_upload
// );
// app.route('/upload/music/multiple').post(
//   // user_credentials
//   awsCtrl.multi_music_upload
// );
//
// app.route('/upload/video').post(admin_credentials, awsCtrl.single_video_upload);
// app
//   .route('/upload/video/multiple')
//   .post(admin_credentials, awsCtrl.multi_video_upload);

export default app;
