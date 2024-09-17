import { SORT_ORDER } from '../constants/contacts.js';
import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();
  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, page, perPage);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const createContact = (payload) => {
  const contact = ContactCollection.create(payload);
  return contact;
};

export const deleteContact = async (id) => {
  const contact = await ContactCollection.findByIdAndDelete({
    _id: id,
  });
  return contact;
};

export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await ContactCollection.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  console.log(rawResult);

  if (!rawResult || !rawResult.value) {
    return null;
  }

  return {
    movie: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
