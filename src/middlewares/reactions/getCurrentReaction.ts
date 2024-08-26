import { IComment } from "../../models/comment";
import { IPost } from "../../models/post";

const getCurrentReaction = (currentUserId: string, post: IPost | IComment) => {
    const reaction = post.reactions.find((reaction) => {
        return reaction.users.find((user) => user._id.equals(currentUserId));
    });

    return reaction ? reaction.reaction : "";
};

export default getCurrentReaction;
