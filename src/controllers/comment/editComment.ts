import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Types } from "mongoose";
import { Comment } from "../../models/comment";
import { ICommentEditHistory } from "../../models/editHistory";
const editComment = async (req:Request, res: Response, next: NextFunction)=>{
    const {postId, commentId} = req.params;
    const {text} = req.body;
    
    if (!text) {
        return next(new BadRequestError("Nothing to update"));
    }

    const comment = await Comment.findOne({_id:commentId, postID:postId});
    
    if (!comment) {
        return next(new NotFoundError("Comment not found."));
    };
    comment.text = text;
    const newEditHistory: ICommentEditHistory = {
        text: text,
        updateAt: new Date(),
    };

    const updateComment = Comment.findOneAndUpdate(
        new Types.ObjectId(commentId),
        {
            text: text,
            editHistory: [...comment.editHistory,newEditHistory]
    },
        {new: true}).exec();
    res.status(200).json(updateComment);
};