import { Router } from 'express';
import * as handlers from '../../handlers/users.handlers';
import validateTokenMiddleware from '../../handlers/authentication';

const routes = Router();

routes
  .route('/')
  .get(validateTokenMiddleware, handlers.index)
  .post(handlers.create);

routes
  .route('/:usersID')
  .get(handlers.show)
  .patch(handlers.update)
  .delete(handlers.deleteUser);

// authentication
routes.route('/auth').post(handlers.authenticate);

export default routes;
