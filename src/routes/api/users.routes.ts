import { Router } from 'express';
import * as handlers from '../../handlers/users.handlers';
// import validateTokenMiddleware from '../../models/authentication';

const routes = Router();

routes
  .route('/')
  .get(handlers.index)
  .post(handlers.create);

routes
  .route('/:usersID')
  .get(handlers.show)
  .put(handlers.update)
  .delete(handlers.deleteUser);

// authentication
routes.route('/auth').post(handlers.authenticate);

export default routes;
