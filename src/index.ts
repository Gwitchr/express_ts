import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
// import cookieParser from 'cookie-parser';
// import session from 'cookie-session';
import logger from 'morgan';
// import csurf from "csurf";
import compression from 'compression';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import bodyParser from 'body-parser';
import mongooseConnection from './config/connection';
import routes from './routes';

dotenv.config();

// Sentry initialize
// Sentry.init({
//   dsn:
//     "https://af875853bbe6492196a59bfc877ee125@o114383.ingest.sentry.io/5276151"
// });

const app = express();

// sentry setup
// app.use(Sentry.Handlers.requestHandler());

let whiteList: string[] | null;
//
if (process.env.NODE_ENV === 'development') {
  whiteList = [`http://localhost:${process.env.PORT}`];
  app.use(logger('dev'));
  mongooseConnection(process.env.MONGODB_DEV || '');
} else {
  whiteList = null;
  mongooseConnection(process.env.MONGODB_URI || '');
}

const optionsCors: CorsOptions = {
  origin(origin, callback) {
    if (
      (Array.isArray(whiteList) &&
        whiteList.length &&
        origin &&
        whiteList.indexOf(origin) !== -1) ||
      !origin
    ) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
  // credentials: true
};

app.use(compression());
app.use(helmet());
app.use(cors(optionsCors));
// Default types break, so a generic Response type is passed instead
app.options('*', cors<Request>(optionsCors));
app.set('trust proxy', 1);
// app.use(session({
//   secret: '4lw4y5 Be773r',
// }))
// app.use(cookieParser('secret'));
// app.use(csurf({ cookie: true }));
app.disable('x-powered-by');

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   if (req.originalUrl.includes("stripe-webhook")) {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

app.use('/api', routes);

app.use(
  // [
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'connect-src': ["'self'", 'https://checkout.stripe.com'],
      'frame-src': [
        "'self'",
        'https://checkout.stripe.com',
        'https://n12mx.s3-us-west-1.amazonaws.com'
      ],
      'child-src': ["'self'", 'https://checkout.stripe.com'],
      'script-src': ["'self'", 'https://checkout.stripe.com'],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
        'https://checkout.stripe.com'
      ],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'img-src': [
        "'self'",
        'https://*.stripe.com',
        'https://res.cloudinary.com',
        'https://n12mx.s3-us-west-1.amazonaws.com'
      ],
      'default-src': ["'self'", 'https://n12mx.s3-us-west-1.amazonaws.com'],
      'object-src': ["'self'", 'https://n12mx.s3-us-west-1.amazonaws.com']
    }
  })
  // ]
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
  // force https
  app.use((req, res, next) => {
    if (req.get('X-Forwarded-Proto') !== 'https') {
      res.redirect(`https://${req.get('Host')}${req.url}`);
    } else next();
  });
  const sixtyDaysInSeconds = 5184000;
  app.use(
    helmet.hsts({
      maxAge: sixtyDaysInSeconds
    })
  );

  // Serve any static files
  app.use(express.static(path.join(__dirname, '../app/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../app/build', 'index.html'));
  });
}
// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = error.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = error;

  // render the error page
  console.warn({ appLevelError: error });
  res.status(error.status || 500).json({
    error: error.es || error.en ? error : error.toString()
  });
  next(error);

  // res.render('error');
});

module.exports = app;
