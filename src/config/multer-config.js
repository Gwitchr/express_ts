import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import mime from "mime";
import {
  env
  // env_becards
} from "./s3-env-config";
import { imageFilter, musicFilter, videoFilter } from "../utils/file-filter";

const s3 = new aws.S3({
  accessKeyId: env.AWS_ACCESS_KEY,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.REGION
  // Bucket: env.Bucket
});
// console.log('env', env)
const PUBLIC = "public-read";

export const wrapperUpload = (filter, path = "img") => {
  let applyFilter;
  if (filter === "music") {
    applyFilter = musicFilter;
  } else if (filter === "video") {
    applyFilter = videoFilter;
  } else if (filter === "image") {
    applyFilter = imageFilter;
  }
  return multer({
    applyFilter,
    storage: multerS3({
      acl: PUBLIC,
      s3,
      bucket: env.Bucket,
      // metadata: (req, file, cb) => {
      //   cb(null, {
      //     fieldName: 'TESTING_METADATA'
      //   });
      // },
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        cb(
          null,
          `${path}/${Date.now().toString()}-${
            req.query.user_id
          }.${mime.getExtension(file.mimetype)}`
        );
      }
    })
  });
};

export const upload = multer({
  imageFilter,
  storage: multerS3({
    acl: PUBLIC,
    s3,
    bucket: env.Bucket,
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: "TESTING_METADATA"
      });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}.${mime.getExtension(file.mimetype)}`);
    }
  })
});
