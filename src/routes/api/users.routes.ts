import { Router } from "express";
import * as controllers from '../../controllers/users.controllers'

const routes = Router();

routes.route('/')
  .get(controllers.getAllUsers)
  .post(controllers.create);

routes.route('/:usersID')
  .get(controllers.getOneUser)
  .patch(controllers.updateOneUser)
  .delete(controllers.deleteOneUser);

export default routes;