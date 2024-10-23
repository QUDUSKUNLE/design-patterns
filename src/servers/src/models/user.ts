import mongoose, { Schema } from 'mongoose';

interface UserInterface {
  name: string;
}

const User = mongoose.model<UserInterface>('User', new Schema({
  name: { type: String }
}))

export { User }
