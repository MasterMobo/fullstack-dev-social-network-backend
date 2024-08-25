import { IPost } from "../../../models/post";

const getCurrentPostReaction = (currentUserId: string, post: IPost) => {
    const reaction = post.reactions.find((reaction) => {
        return reaction.users.find((user) => user._id.equals(currentUserId));
    });

    return reaction ? reaction.reaction : "";
};

export default getCurrentPostReaction;
