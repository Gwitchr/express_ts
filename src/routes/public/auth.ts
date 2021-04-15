import express, { Router } from 'express';
import * as authCtrl from '../../controllers/auth';

const app: Router = express.Router();

// User credentials already have user roles

app.route('/auth/sign_up').post(authCtrl.signUp);
// app.route("/auth/sign_up").post(authCtrl.signUp);

app.route("/auth/login").post(authCtrl.login);
//
// app.route("/auth/forgot_password").post(authCtrl.forgotPassword);
// //
// // app
// //     .route('/auth/change_password')
// //         .put(user_credentials, authCtrl.change_password);
// //
// app.route("/auth/validate_token/:token").get(authCtrl.validateToken);
// //
// app.route("/auth/password_reset/").post(authCtrl.resetPassword);
//
app.route('/auth/verify_account').post(authCtrl.verifyAccount);

// app
//     .route('/auth/recover_password')
//         .post(authCtrl.forgot_password);

export default app;
