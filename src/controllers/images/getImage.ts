import { Request, Response, NextFunction } from "express";
import { Image } from "../../models/image";
import { NotFoundError } from "../../errors";

const getImage = async (req: Request, res: Response, next: NextFunction) => {
    const image = await Image.findById(req.params.id);

    if (!image) {
        return next(new NotFoundError("Image not found"));
    }

    res.set("Content-Type", image.data.contentType);
    res.send(image.data.data);
};

export default getImage;
