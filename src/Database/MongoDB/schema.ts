import { Schema, Model } from "mongoose";
import mongoose from "mongoose";


const itemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
})

const Item = mongoose.model('Item', itemSchema)

export { Item }
