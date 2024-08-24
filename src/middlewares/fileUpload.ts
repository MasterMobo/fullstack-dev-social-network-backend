import multer from "multer";

const storage = multer.memoryStorage();

const singleFileUpload = (fieldName: string) =>
    multer({ storage: storage }).single(fieldName);

const manyFilesUpload = (fieldName: string, limit: number = 10) =>
    multer({ storage: storage }).array(fieldName, limit);

export { singleFileUpload, manyFilesUpload };
