import { Router } from 'express';
import * as handlers from '../../handlers/users.handlers';
import verifyAuthToken from '../../middleware/token.middleware';

const routes = Router();

routes.route('/').get(handlers.index).post(verifyAuthToken, handlers.create);

routes
  .route('/:userName')
  .get(handlers.show)
  .put(verifyAuthToken, handlers.update)
  .delete(verifyAuthToken, handlers.deleteUser);

export default routes;
