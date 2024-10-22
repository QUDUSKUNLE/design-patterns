import mongoose, { Schema } from 'mongoose';

interface AlbumInterface {
  performer: string;
  title: string;
  cost: number;
}

const Album = mongoose.model<AlbumInterface>('Album', new Schema({
  performer: { type: String },
  title: { type: String },
  cost: { type: Number },
}))

export { Album };

