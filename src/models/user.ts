import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const UserSchema = new Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false
    },
    // admin = 1
    role: {
      type: Number,
      default: 3
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    profile_image: {
      type: String
    },
    title: {
      type: String
    },
    telephone: {
      type: String
    },
    extension: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email address required']
    },
    addresses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Address'
      }
    ],
    status: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Status'
      }
    ],
    verification_code: {
      type: String
    },
    reset_password_token: {
      type: String
    },
    reset_password_expires: {
      type: Number
    }
  },
  {
    versionKey: false,
    // usePushEach: true,
    timestamps: true
  }
);

export default model<IUser>('User', UserSchema);
