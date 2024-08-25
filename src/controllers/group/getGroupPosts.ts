import { NextFunction, Request, Response } from "express";
import { Post } from "../../models/post";
import { Group } from "../../models/group";
import { NotFoundError, UnauthorizedError } from "../../errors";
import getCurrentPostReaction from "../post/helpers/getCurrentPostReaction";

const getGroupPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get group ID from request parameters
    const { groupId } = req.params;

    // Check if group exists
    const group = await Group.findById(groupId).exec();
    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    if (group.visibility === "private") {
        // Check if current user is a member of the group
        const user = req.signedCookies["user"];
        const isMember = group.members.find((member) =>
            member._id.equals(user._id)
        );

        if (!isMember) {
            return next(
                new UnauthorizedError("You are not a member of this group")
            );
        }
    }

    // Find all posts in the group
    const posts = await Post.find({ group: groupId })
        .populate("user")
        .populate("group")
        .exec();

    const currentUserId = req.signedCookies["user"]._id;

    const responsePosts = posts.map((post) => {
        const currentReaction = getCurrentPostReaction(currentUserId, post);
        return { ...post.toObject(), currentReaction };
    });
    return res.json({ posts: responsePosts });
};

export default getGroupPosts;
