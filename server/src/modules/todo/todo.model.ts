import { Document, Schema } from 'mongoose';
import { IUser } from '../user/user.model';

export const TodoModel = new Schema({
  createdBy: { type: Schema.Types.Object, ref: 'User' },
  assigned: { type: Schema.Types.Object, ref: 'User' },
  name: { type: String, require: true },
  description: { type: String, require: true },
  status: {
    type: String,
    enum: ['TODO','DONE'],
    default: 'TODO',
  },
  dueDate: { type: Date, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
}, {
  versionKey: false,
});

export interface ITodo extends Document {
  id: string;
  createdBy: IUser;
  assigned: IUser;
  name: string;
  description: string;
  status: TodoStatus;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
