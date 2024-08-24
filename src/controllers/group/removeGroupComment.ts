import { Request, Response, NextFunction } from "express";
import { Comment } from "../../models/comment";
import { Group } from "../../models/group";
import { NotFoundError, UnauthorizedError } from "../../errors";

const removeGroupComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { groupId, postId, commentId } = req.params;

    // Check if group exists
    const group = await Group.findById(groupId).exec();
    if (!group) {
        return next(new NotFoundError("Group not found"));
    }

    // Check if post exists
    const post = Group.findOne({
        _id: postId,
        groupID: groupId,
    }).exec();
    if (!post) {
        return next(new NotFoundError("Post not found"));
    }

    // Check if comment exists
    const comment = await Comment.findById(commentId).exec();
    if (!comment) {
        return next(new NotFoundError("Comment not found"));
    }

    // Check if current user is the admin of the group
    const user = req.signedCookies["user"];
    if (!group.admins[0]._id.equals(user._id)) {
        return next(
            new UnauthorizedError("You are not the admin of this group.")
        );
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId).exec();

    return res.json({ comment: deletedComment });
};

export default removeGroupComment;
