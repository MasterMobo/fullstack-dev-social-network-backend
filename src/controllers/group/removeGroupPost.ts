import { Request, Response, NextFunction } from "express";
import { Post } from "../../models/post";
import { NotFoundError, UnauthorizedError } from "../../errors";
import { Group } from "../../models/group";

const removeGroupPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { groupId, postId } = req.params;

    // Check if post exists
    const post = await Post.findOne({ _id: postId, group: groupId }).exec();
    if (!post) {
        return next(new NotFoundError("Post not found"));
    }

    const group = await Group.findById(groupId).exec();
    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    // Check if current user is the admin of the group
    const user = req.signedCookies["user"];

    if (!group.admins[0]._id.equals(user._id)) {
        return next(
            new UnauthorizedError("You are not the admin of this group.")
        );
    }

    const deletedPost = await Post.findByIdAndDelete(postId).exec();

    return res.json({ post: deletedPost });
};

export default removeGroupPost;
