import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

// import sgMail from '@sendgrid/mail';
// import {SENDGRID_CREDENTIALS} from './sendgrid';

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.mx',
  pool: true,
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: process.env.ACCOUNT_MAIL,
    pass: process.env.PASS_MAIL
  },
  tls: {
    // do not fail on invalid certs
    // rejectUnauthorized: false
  }
});

// sgMail.setApiKey(SENDGRID_CREDENTIALS.api_key);
// const msg = {
//   to: 'luiscasillas@n12.mx',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log(
      `Server is ready to take our messages from ${process.env.ACCOUNT_MAIL}`
    );
  }
});

const abso = path.resolve(__dirname, '../template/');
const part = path.resolve(__dirname, '../template/partials');
// const abso = path.join(path.dirname(module.parent.filename), '../template');
transporter.use(
  'compile',
  hbs({
    viewEngine: {
      partialsDir: part,
      // layoutsDir: abso,
      defaultLayout: false,
      extName: '.handlebars'
    },
    viewPath: abso,
    extName: '.html'
  })
);

export default transporter;
