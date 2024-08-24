import { Request, Response } from "express";
import { Post } from "../../models/post";

const getGroupPosts = async (req: Request, res: Response) => {
    // Get group ID from request parameters
    const { groupId } = req.params;

    // Find all posts in the group
    const posts = await Post.find({ groupID: groupId }).exec();

    return res.json({ posts });
};

export default getGroupPosts;
