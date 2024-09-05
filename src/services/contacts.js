import ContactCollection from '../db/models/Contact.js';

export const getAllContacts = () => ContactCollection.find();

export const getContactById = id => ContactCollection.findById(id);


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
