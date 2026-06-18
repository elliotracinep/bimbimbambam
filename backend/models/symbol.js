import mongoose from "mongoose";

const symbolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: Image, reqired: true}
});
export const Symbol = mongoose.model("Symbol", symbolSchema);
