export const imageFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type, only JPEG, JPG, PNG and GIF are allowed!"),
      false
    );
  }
};

export const musicFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(wav|mp3|wma|m4p|aax)$/)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only mp3 and m4p are allowed!"), false);
  }
};

export const videoFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(mp4|3gp|ogg|vmw|webm|flv|avi)$/)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type, only MP4, 3GP, OGG, VMW, WEBM, FLV and AVI are allowed"
      ),
      false
    );
  }
};
