import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'any.required': 'number must be exist',
  }),
  email: Joi.string().min(3).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactTypeList)
    .required(),
});

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(30),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});
