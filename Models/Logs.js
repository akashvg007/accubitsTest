import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  Id: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  newsLetterName: {
    type: String,
    required: true,
  },
});

export default mongoose.model("users", logSchema);
