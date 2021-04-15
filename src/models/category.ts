import { Schema, model } from 'mongoose';
import { ICategory } from '../types';

const CategorySchema = new Schema(
  {
    name: {
      es: {
        type: String
      },
      en: {
        type: String
      }
    },
    description: {
      es: {
        type: String
      },
      en: {
        type: String
      }
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model<ICategory>('Category', CategorySchema);
