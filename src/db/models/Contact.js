import { Schema, model } from 'mongoose';
import { contactTypeList } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
