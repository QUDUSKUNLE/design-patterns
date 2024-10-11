import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const User = mongoose.model('User', new Schema({
  name: { type: String }
}))

export { User }
