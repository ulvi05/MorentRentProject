import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Review", reviewSchema);
