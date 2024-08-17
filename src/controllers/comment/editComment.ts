import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { Comment } from "../../models/comment";
const editComment = async (req:Request, res: Response, next: NextFunction)=>{
    const {postId, commentId} = req.params;
    const {text} = req.body;
  
    const comment = await Comment.findOne({_id:commentId, postID:postId});
    
    if (!comment) {
        return next(new BadRequestError("Comment not found."));
    };
    comment.text = text;
    await comment.save();
    res.status(200).json(comment);
};