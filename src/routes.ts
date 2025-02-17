import { Router } from 'express';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/authenticateDeliverymanController';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCases/FindAllDeliveries/FindAllDeliveriesDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const deliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post('/client/', createClientController.handle) // create client
routes.post('/client/authenticate', authenticateClientController.handle) // // verificando se o cliente está logado
routes.get('/client/deliveries', ensureAuthenticateClient, findAllDeliveriesController.handle)

routes.post('/deliveryman', createDeliverymanController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)

routes.post('/delivery', ensureAuthenticateClient, deliveryController.handle)
routes.get('delivery/available', ensureAuthenticateDeliveryman, findAllAvailableController.handle)
routes.put('/delivery/updateDeliveryman', ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.put('/delivery/updateEndDate', ensureAuthenticateDeliveryman, updateEndDateController.handle)



export { routes }