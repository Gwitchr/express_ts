import { Schema, model } from 'mongoose';
import { INote } from '../types';

const NoteSchema = new Schema(
  {
    added_by: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String
    },
    note: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model<INote>('Notes', NoteSchema);
