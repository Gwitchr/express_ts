import { Schema, model } from 'mongoose';
import { IStatus } from '../types';

const StatusSchema = new Schema(
  {
    added_by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    note: {
      type: String
    },
    priority: {
      type: String,
      enum: ['Alta', 'Media', 'Baja'],
      default: 'Baja'
    },
    status: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model<IStatus>('Status', StatusSchema);
