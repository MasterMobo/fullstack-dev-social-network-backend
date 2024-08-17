import e from "express";
import multer from "multer";

const storage = multer.memoryStorage();

const singleFileUpload = multer({ storage: storage }).single("file");

const manyFilesUpload = (fieldName: string, limit: number = 10) =>
    multer({ storage: storage }).array(fieldName, limit);

export { singleFileUpload, manyFilesUpload };
