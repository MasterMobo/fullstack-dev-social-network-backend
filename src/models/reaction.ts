import { Schema, model } from "mongoose";
import { IUser } from "./user";
interface IReaction {
    reaction: "Like" | "Love" | "Haha" | "Angry";
    users: IUser[];
}

const ReactionShema = new Schema<IReaction>({
    reaction: {
        type: String,
        enum: ["Like", "Love", "Haha", "Angry"],
    },
    users: Array<IUser>,
});
const Reaction = model<IReaction>("Reaction", ReactionShema);

export { Reaction, IReaction };
