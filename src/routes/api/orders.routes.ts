import { Router } from 'express';
import * as handlers from '../../handlers/orders.handlers';
import verifyAuthToken from '../../middleware/token.middleware';

const routes = Router();

routes.route('/').get(handlers.index).post(verifyAuthToken, handlers.create);

routes
  .route('/:orderID')
  .get(handlers.show)
  .delete(verifyAuthToken, handlers.deleteOrder);

export default routes;
