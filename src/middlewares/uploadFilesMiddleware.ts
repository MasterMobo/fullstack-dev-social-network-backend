import util from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import env from "../config/env";

if (!env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

const storage = new GridFsStorage({
  url: env.MONGO_URI,
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}${file.originalname}`;
    }

    return {
      bucketName: "images",
      filename: `${Date.now()}${file.originalname}`,
    };
  },
});

const uploadFiles = multer({ storage }).single("profilePic");
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware;
