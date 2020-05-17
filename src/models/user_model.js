import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    } else {
      return callback(null, isMatch);
    }
  });
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
