import { Request, Response } from "express";
import { MongoClient, GridFSBucket } from "mongodb";
import env from "../../config/env";
import uploadFilesMiddleware from "../../middlewares/uploadFilesMiddleware";

const baseUrl = "http://localhost:8080/files/";
const mongoClient = new MongoClient(env.MONGO_URI!);

// Upload a file
export const uploadFiles = async (req: Request, res: Response) => {
  try {
    await uploadFilesMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "You must select a file." });
    }

    return res.status(200).send({ message: "File has been uploaded." });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: `Error when trying to upload image: ${error}`,
    });
  }
};

// Get the list of uploaded files
export const getListFiles = async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db();
    const images = database.collection("images.files");

    const cursor = images.find({});

    if ((await cursor.count()) === 0) {
      return res.status(404).send({ message: "No files found!" });
    }

    const fileInfos: { name: string; url: string }[] = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }
};

// Download a specific file by name
export const download = async (req: Request, res: Response) => {
  try {
    await mongoClient.connect();

    const database = mongoClient.db();
    const bucket = new GridFSBucket(database, {
      bucketName: "images",
    });

    const downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", (data) => res.status(200).write(data));
    downloadStream.on("error", () =>
      res.status(404).send({ message: "Cannot download the Image!" })
    );
    downloadStream.on("end", () => res.end());
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }
};
