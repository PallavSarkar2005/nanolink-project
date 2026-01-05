import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  clicks: { 
    type: Number, 
    default: 0 
  },
  // NEW FIELD: Owner of the link
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null // Null means "Guest Link"
  },
  date: { 
    type: String, 
    default: Date.now 
  }
});

export default mongoose.model("Url", urlSchema);