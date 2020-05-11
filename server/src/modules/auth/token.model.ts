import * as mongoose from 'mongoose';
import { IUser } from '../user/user.model';

export const TokenModel = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  token: { type: String, require: true },
  type: { type: String, require: true },
  isRevoked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
}, {
  versionKey: false,
});


export interface IToken extends mongoose.Document {
  id: string
  userId: string,
  token: string,
  type: string,
  isRevoked: boolean,
  createdAt: Date,
  updatedAt: Date,
}
