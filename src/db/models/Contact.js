import { Schema, model } from "mongoose";
const contactSchema = new Schema({
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
        enum: ['work', 'home', 'personal'],
        default: 'personal',
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: false,
    }
}, { versionKey: false, timestamps: true });

const ContactCollection = model('contact', contactSchema);


export default ContactCollection;
