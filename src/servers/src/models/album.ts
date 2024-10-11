import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const Album = mongoose.model('Album', new Schema({
  performer: { type: String },
  title: { type: String },
  cost: { type: Number },
}))

export { Album }
