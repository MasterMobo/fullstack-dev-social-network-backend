import { NextFunction, Request, Response } from "express";
import { IImage, Image, supportedImageFormats } from "../../models/image";
import { BadRequestError } from "../../errors";

const uploadImages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let imageUrls: string[] = [];
    const images = req.files as Express.Multer.File[];

    if (!images) {
        return imageUrls;
    }

    // Loop through all images array and upload them
    for (const image of images) {
        if (!image) {
            continue;
        }

        if (!supportedImageFormats.includes(image.mimetype)) {
            return next(
                new BadRequestError(
                    "Invalid image format. Supported formats are: " +
                        supportedImageFormats.join(", ")
                )
            );
        }

        const newImage: IImage = {
            name: image.originalname + "-" + Date.now(),
            data: {
                data: image.buffer,
                contentType: image.mimetype,
            },
        };

        const imageDoc = await Image.create(newImage);

        if (!imageDoc) {
            return imageUrls;
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/images/${
            imageDoc._id
        }`;
        imageUrls.push(imageUrl);
    }

    return imageUrls;
};

export default uploadImages;
