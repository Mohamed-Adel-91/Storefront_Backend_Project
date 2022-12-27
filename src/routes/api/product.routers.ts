import { Router } from 'express';
import * as handlers from '../../handlers/product.handlers';
import verifyAuthToken from '../../middleware/token.middleware';

const routes = Router();

routes.route('/').get(handlers.index).post(verifyAuthToken, handlers.create);

routes
  .route('/:productID')
  .get(handlers.show)
  .delete(verifyAuthToken, handlers.deleteProduct);

export default routes;
