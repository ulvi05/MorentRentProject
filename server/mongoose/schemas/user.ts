import mongoose from "mongoose";
const { Schema } = mongoose;

// interface IUser extends Document {
//   name: string;
//   surname: string;
//   email: string;
//   password: string;
//   isBlocked: boolean;
//   role: "admin" | "user";
//   resetPasswordToken?: string | null;
//   resetPasswordTokenExpires?: Date | null;
// }

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordTokenExpires: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("User", userSchema);
