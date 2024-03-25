import { zodMongoId } from "@cllgnotes/zod";
import { Comment } from "../../mongoose/modals/modals.js";
import { zodCommentInput } from "@cllgnotes/zod/zod.comments.js";
export const resolverComments = {
  Comments: async (parent, args) => {
    return await Comment.find({});
  },
};

export const resolverMutComments = {
  addComment: async (parent, args, context) => {
    try {
      const { user } = context;
      console.log("--- in add comment ---");
      // console.log("in add cousrse", args,args.input.img);
      console.log("validating user");
      const userWhoSentReq = zodMongoId.parse(user?._id);
      const commentRecieved = zodCommentInput.parse(args.input);
      if (userWhoSentReq !== commentRecieved.user) {
        return new Error("User not allowed to add comment");
      }
      console.log("user and comment data validated, saving...");
      const comment = new Comment(commentRecieved);
      console.log("comment created", comment);
      await comment.save();
      return {
        msg: "comment added",
        status: "success",
        data: [comment],
      };
    } catch (error) {
      console.log("error in add comment", error);
      return {
        msg: "comment not added",
        status: "error",
        err: error,
      };
    }
  },
  deleteComment: async (parent, args, context) => {
    try {
      const { user } = context;
      console.log("--- in delete comment ---");
      console.log("validating user");
      // const userID = zodMongoId.parse(args.userId);
      const commentId = zodMongoId.parse(args.id);
      const userWhoSentReq = zodMongoId.parse(user?._id);
      // if (userWhoSentReq !== userID) {
      //   return new Error("User not allowed to delete comment");
      // }
      console.log("user and comment data validated, saving...");
      const comment = await Comment.findOneAndDelete({
        _id: commentId,
        user: userWhoSentReq,
      });
      console.log("comment created", comment);
      return {
        msg: "comment deleted",
        status: "success",
      };
    } catch (error) {
      console.log("error in delete comment", error);
      return {
        msg: "comment not deleted",
        status: "error",
        err: error,
      };
    }
  },
  updateComment: async (parent, args, context) => {
    try {
      const { user } = context;
      console.log("--- in update comment ---");
      // console.log("in update cousrse", args,args.input.img);
      console.log("validating user");
      const userWhoSentReq = zodMongoId.parse(user?._id);
      const commentRecieved = zodCommentInput.partial().parse(args.input);
      const commentId = zodMongoId.parse(args.id);
      // if (userWhoSentReq !== commentRecieved.user) {
      //   return new Error("User not allowed to update comment");
      // }
      console.log("user and comment data validated, saving...");
      const comment = await Comment.findOneAndUpdate(
        { _id: commentId, user: userWhoSentReq },
        commentRecieved
      );
      console.log("comment created", comment);
      return {
        msg: "comment added",
        status: "success",
        data: [comment],
      };
    } catch (error) {
      console.log("error in update comment", error);
      return {
        msg: "comment not added",
        status: "error",
        err: error,
      };
    }
  },
};
