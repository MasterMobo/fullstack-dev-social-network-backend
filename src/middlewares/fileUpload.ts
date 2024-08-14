import e from "express";
import multer from "multer";

const storage = multer.memoryStorage();

const singleFileUpload = multer({ storage: storage }).single("file");

export { singleFileUpload };
