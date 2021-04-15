import dotenv from "dotenv";

dotenv.config();

const env = {
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  REGION: process.env.AWS_REGION,
  Bucket: process.env.AWS_BUCKET_NAME
};

export { env };
