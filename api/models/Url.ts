import { model, Schema, models } from "mongoose";

const UrlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

export default models["Url"] || model("Url", UrlSchema);
