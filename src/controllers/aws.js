import {
  singleImageUpload as singleImageUpload_bucket,
  singleMusicUpload as singleMusicUpload_bucket,
  singleVideoUpload as singleVideoUpload_bucket,
  multipleImageUpload as multipleImageUpload_bucket,
  multipleMusicUpload as multipleMusicUpload_bucket,
  multipleVideoUpload as multipleVideoUpload_bucket
} from "../config/s3-bucket-config";

export const singleImageUpload = async (req, res, next) => {
  try {
    singleImageUpload_bucket(req, res, (err, some) => {
      if (err) {
        res.status(422).send({
          errors: [
            {
              title: "Image Upload Error",
              detail: err.message
            }
          ]
        });
      }
      if (req.file && req.file.location) {
        res.json({
          image_url: req.file.location
        });
      } else {
        console.warn("[File] no location");
      }
    });
  } catch (error) {
    next(error);
  }
};

export const multiImageUpload = async (req, res, next) => {
  try {
    multipleImageUpload_bucket(req, res, (err, some) => {
      if (err) {
        res.status(422).send({
          errors: [
            {
              title: "Image Upload Error",
              detail: err.message,
              error: err
            }
          ]
        });
      }
      const locations = req.files.length
        ? req.files.map((file) => file.location)
        : [];
      res.json({
        image_urls: locations
      });
    });
  } catch (error) {
    next(error);
  }
};

export const singleMusicUpload = async (req, res, next) => {
  try {
    singleMusicUpload_bucket(req, res, (err, some) => {
      if (err) {
        res.status(422).send({
          errors: [
            {
              title: "Music Upload Error",
              detail: err.message
            }
          ]
        });
      }
      res.json({
        music_url: req.file.location
      });
    });
  } catch (error) {
    next(error);
  }
};

export const multiMusicUpload = async (req, res, next) => {
  try {
    multipleMusicUpload_bucket(req, res, (err, some) => {
      if (err) {
        res.status(422).send({
          errors: [
            {
              title: "Music Upload Error",
              detail: err.message
            }
          ]
        });
      }
      const locations = req.files.map((file) => file.location);
      res.json({
        music_urls: locations
      });
    });
  } catch (error) {
    next(error);
  }
};

export const singleVideoUpload = async (req, res, next) => {
  try {
    singleVideoUpload_bucket(req, res, (err, some) => {
      if (err) {
        res.status(422).send({
          errors: [
            {
              title: "Video Upload Error",
              detail: err.message
            }
          ]
        });
      }
      res.json({
        video_url: req.file.location
      });
    });
  } catch (error) {
    next(error);
  }
};

export const multiVideoUpload = async (req, res, next) => {
  try {
    multipleVideoUpload_bucket(req, res, (err, some) => {
      if (err) {
        res.status(422).send({
          errors: [
            {
              title: "Videos Upload Error",
              detail: err.message
            }
          ]
        });
      }
      const locations = req.files.map((file) => file.location);
      res.json({
        video_urls: locations
      });
    });
  } catch (error) {
    next(error);
  }
};
