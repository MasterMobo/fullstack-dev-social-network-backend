import { NextFunction, Request, Response } from "express";
import { IImage, Image, supportedImageFormats } from "../../models/image";
import { BadRequestError } from "../../errors";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return next(new Error("No file uploaded"));
        }

        if (!supportedImageFormats.includes(req.file.mimetype)) {
            return next(
                new BadRequestError(
                    "Invalid image format. Supported formats are: " +
                        supportedImageFormats.join(", ")
                )
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
