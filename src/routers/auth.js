import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
  userSighUpSchema,
  userSigInSchema,
} from '../validations/auth.js';
import * as authControllers from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  validateBody(userSighUpSchema),
  ctrlWrapper(authControllers.signupController),
);
export default authRouter;

authRouter.post(
  '/auth/login',
  validateBody(userSigInSchema),
  ctrlWrapper(authControllers.signinController),
);

authRouter.post(
  '/auth/refresh',
  ctrlWrapper(authControllers.refreshController),
);

authRouter.post('/auth/logout', ctrlWrapper(authControllers.logoutController));

authRouter.post(
  '/auth/send-reset-email',
  ctrlWrapper(authControllers.requestResetEmailController),
  validateBody(requestResetEmailSchema),
);

authRouter.post(
  '/auth/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(authControllers.resetPasswordController),
);
