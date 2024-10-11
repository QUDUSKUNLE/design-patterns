import { Schema, Types } from 'mongoose';
import mongoose from 'mongoose';

interface PurchaseInterface {
  user: Types.ObjectId,
  album: Types.ObjectId,
}

const Purchase = mongoose.model<PurchaseInterface>(
  'Purchase',
  new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
  })
)

export { Purchase }
