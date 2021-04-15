import { Schema, model } from 'mongoose';
import { IBrand } from '../types';

const BrandSchema = new Schema(
  {
    guides: [
      {
        name: {
          es: {
            type: String,
            required: true
          },
          en: String
        },
        asset: String, // url from pdf
        description: {
          es: {
            type: String,
            required: true
          },
          en: String
        },
        metadata: {}
      }
    ],
    resources: [
      {
        name: {
          es: {
            type: String,
            required: true
          },
          en: String
        },
        description: {
          es: {
            type: String,
            required: true
          },
          en: String
        },
        asset: String, // url from pdf
        metadata: {}
      }
    ],
    handle: {
      type: String,
      required: true
    },
    name: {
      es: {
        type: String,
        required: true
      },
      en: {
        type: String
      }
    },
    description: {
      es: {
        type: String,
        required: true
      },
      en: {
        type: String
      }
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category'
      }
    ],
    logo_img: { type: String },
    color_array: [{ type: String }],
    metadata: {},
    external_links: {},
    tags: [
      {
        type: String
      }
    ],
    attributes: [
      {
        type: String
      }
    ],

    active: {
      type: Boolean,
      defualt: true
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model<IBrand>('Brand', BrandSchema);
