import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import {Types} from "mongoose";
import { Comment, IComment } from "../../models/comment";
const createComment = async (req:Request, res: Response, next: NextFunction)=>{
    const {postId} = req.params;
    const {text} = req.body;
    
    if (!text) {
        return next(new BadRequestError("Post must have text"));
    }
    const newComment:IComment = {
        postID: new Types.ObjectId(postId),
        text: text,
        reactions: [],
        editHistory: [],
    };
    const comment = await Comment.create(newComment);
    res.status(200).json(newComment);
};

export default createComment;