import { Schema, Types, model } from "mongoose";

interface IMemberRequest {
  userId: Types.ObjectId;
  groupId: Types.ObjectId;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
}

const MemberRequestSchema = new Schema<IMemberRequest>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const MemberRequest = model<IMemberRequest>(
  "MemberRequest",
  MemberRequestSchema
);

export { MemberRequest, IMemberRequest };
