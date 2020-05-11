import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserModel = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, index: { unique: true } },
  password: { type: String, select: false },
});

UserModel.set('toJSON', {
  transform: function(doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
}, {
  versionKey: false,
});

UserModel.virtual('fullName').get(function() {
  return this.firstName + this.lastName;
});

UserModel.on('index', function(err) {
  if (err) console.error('err', err);
});
UserModel.pre<IUser>('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export interface IUser extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
