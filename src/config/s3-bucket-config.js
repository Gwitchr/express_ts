import { upload, wrapperUpload } from "./multer-config";

export const singleMusicUpload = wrapperUpload("music", "music").single(
  "music"
);
export const multipleMusicUpload = wrapperUpload("music", "music").single(
  "musics",
  5
);

export const singleVideoUpload = wrapperUpload("video", "video").single(
  "video"
);
export const multipleVideoUpload = wrapperUpload("video", "video").array(
  "videos",
  5
);

export const singleImageUpload = wrapperUpload("image", "img").single("image");
export const multipleImageUpload = wrapperUpload("image", "img").array(
  "images",
  5
);

export const profilePicture = (id) => wrapperUpload("image", `img/${id}`).single("image");
