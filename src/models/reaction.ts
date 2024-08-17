import { Types } from "mongoose";
import { IUser } from "./user";

interface IReaction {
    reaction: string;
    users: IUser[];
}

const allowedReactions = ["Like", "Love", "Haha", "Angry"];

export { IReaction, allowedReactions };
