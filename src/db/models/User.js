import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniq,
    },
    contactType: {
      type: String,
      required: true,
      enum: contactTypeList,
      default: 'personal',
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const ContactCollection = model('contact', contactSchema);
