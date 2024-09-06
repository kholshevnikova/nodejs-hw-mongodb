import { createContactController, deleteContactController, getContactByIdController, getContactsController, patchContactController } from '../controllers/contacts.js';
import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

router.patch('/contacts/:id', ctrlWrapper(patchContactController));


export default router;
