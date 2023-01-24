import { Schema, model } from 'mongoose';

import User from '@Types/user.type';

const UserSchema = new Schema<User>(
  {
    is_active: { type: Boolean, default: true },

    name: String,
    lastname: String,

    email: String,
    password: String,

    profile: String,

    token: String,
  },
  { versionKey: false, timestamps: true }
);

const Users = model('user', UserSchema);

export default Users;
