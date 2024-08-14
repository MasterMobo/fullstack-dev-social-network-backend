import { Schema, model } from "mongoose";

interface IImage {
    name: string;
    // Only allow PNG and JPEG files
    data: { data: Buffer; contentType: "image/png" | "image/jpeg" };
}

const ImageSchema = new Schema<IImage>({
    name: { type: String, required: true },
    data: { data: Buffer, contentType: String },
});

const Image = model<IImage>("Image", ImageSchema);

export { Image, IImage };
