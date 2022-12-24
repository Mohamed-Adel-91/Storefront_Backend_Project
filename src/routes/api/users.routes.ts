import { Router } from 'express';
import * as handlers from '../../handlers/users.handlers';
import validateTokenMiddleware from '../../handlers/authentication';

const routes = Router();

routes
  .route('/')
  .get(validateTokenMiddleware, handlers.getAllUsers)
  .post(handlers.create);

routes
  .route('/:usersID')
  .get(handlers.getOneUser)
  .patch(handlers.updateOneUser)
  .delete(handlers.deleteOneUser);

// authentication
routes.route('/auth').post(handlers.authenticate);

export default routes;
