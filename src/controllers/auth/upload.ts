import { NextFunction, Request, Response } from "express";
import { IImage, Image } from "../../models/image";
import multer from "multer";
import { BadRequestError } from "../../errors";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return next(new Error("No file uploaded"));
        }

        // Only allow PNG and JPEG files
        if (
            req.file.mimetype !== "image/png" &&
            req.file.mimetype !== "image/jpeg"
        ) {
            return next(
                new BadRequestError("Please upload a PNG or JPEG file")
            );
        }

        const newImage: IImage = {
            name: req.file.originalname + "-" + Date.now(),
            data: {
                data: req.file.buffer,

                contentType: req.file.mimetype as "image/png" | "image/jpeg",
            },
        };

        const image = await Image.create(newImage);

        if (!image) {
            return next(new Error("Failed to upload image"));
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/images/${
            image._id
        }`;

        return imageUrl;
    } catch (error) {
        return next(error);
    }
};

export default uploadImage;
