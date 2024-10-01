import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactAddSchema,
  contactPatchSchema,
} from '../validations/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { autenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(autenticate);
router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(createContactController),
);

router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/contacts/:id',
  isValidId,
  upload.single('photo'),
  validateBody(contactPatchSchema),
  ctrlWrapper(patchContactController),
);

export default router;
