import { NextFunction, Request, Response } from "express";
import { IPost, Post } from "../../models/post";
import { IUser, User } from "../../models/user";
import uploadImages from "../upload/uploadImages";
import { BadRequestError, NotFoundError } from "../../errors";
import { Group } from "../../models/group";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, text, visibility, groupId } = req.body;

    if (!text) {
        return next(new BadRequestError("Post must have text"));
    }

    // Check if user exists
    const user: IUser | null = await User.findById(userId).exec();

    if (!user) {
        return next(new NotFoundError("User not found"));
    }

    const imageUrls = await uploadImages(req, res, next);

    if (!imageUrls) {
        return;
    }

    if (groupId) {
        // Check if group exists
        const group = await Group.findById(groupId).exec();
        if (!group) {
            return next(new NotFoundError("Group not found"));
        }

        // Find if user is a member of the group
        const isMember = group.members.find((member) =>
            member._id.equals(userId)
        );
        if (!isMember) {
            return next(
                new BadRequestError("User is not a member of the group")
            );
        }
    }

    const newPost: IPost = {
        userID: userId,
        groupID: groupId,
        text: text,
        visibility: visibility,
        images: imageUrls,
        reactions: [],
        editHistory: [],
        postedAt: new Date(),
    };

    const post = await Post.create(newPost);

    return res.json({ post });
};

export default createPost;
