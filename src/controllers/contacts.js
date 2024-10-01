import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';
import { createContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseContactFilterParams(req.query);

  const { _id: userId } = req.user;

  const contacts = await contactServices.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const contact = await contactServices.getContact({ _id: id, userId });

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;

  const contact = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const contact = await contactServices.deleteContact({ _id: id, userId });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const photo = req.file;

  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }

  const { _id: userId } = req.user;
  const result = await contactServices.updateContact(
    { _id: id, userId },
    { ...req.body, photo: photoUrl },
  );

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};
