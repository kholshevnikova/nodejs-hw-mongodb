import * as contactServices from '../services/contacts.js';
import createHttpError from "http-errors";
import { createContact } from '../services/contacts.js';


export const getContactsController = async (req, res) => {
    const contacts = await contactServices.getAllContacts();
    res.json({
        status: 200,
        message: "Successfully found contacts!",
        contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactServices.getContactById(id);

    if (!contact) {
      return next(createHttpError(404, "Contact not found"));

    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        contact,
    });
};

export const createContactController = async (req, res) => {

  // console.log(req.body);
  const contact = await createContact(req.body);


  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
    const { id } = req.params;
    const contact = await contactServices.deleteContact(id);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactServices.updateContact(id, req.body);

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));

  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};
