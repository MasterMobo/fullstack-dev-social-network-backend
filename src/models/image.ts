import { Schema, model } from "mongoose";

const supportedImageFormats = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/avif",
];
interface IImage {
    name: string;
    data: { data: Buffer; contentType: string };
}

const ImageSchema = new Schema<IImage>({
    name: { type: String, required: true },
    data: { data: Buffer, contentType: String },
});

const Image = model<IImage>("Image", ImageSchema);

export { Image, IImage, supportedImageFormats };
