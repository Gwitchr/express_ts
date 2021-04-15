import chalk from 'chalk';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongooseConnection = (URI: string) => {
  mongoose.Promise = global.Promise;
  if (process.env.DEBUG_MONGOOSE === 'true') {
    mongoose.set('debug', true);
  }
  mongoose.set('useCreateIndex', true);

  mongoose.connection
    .openUri(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log(
        '%s Connected to db: %s successfully via MONGOOSE',
        chalk.green('✓'),
        URI
      );
    })
    .catch((err) => {
      console.log(err.message);
      console.log(
        '%s MongoDB connection error. Please make sure MongoDB is running.',
        chalk.red('✗')
      );
      process.exit(1);
    });
};

export default mongooseConnection;
