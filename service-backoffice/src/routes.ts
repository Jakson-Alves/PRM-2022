import { Product } from './entity/Product';
import {Router} from 'express';
import BrandController from './controller/BrandController';
import CategoryController from './controller/CategoryController';
import ProductController from './controller/ProductController';
import CustomerController from './controller/CustomerController';
import OrderController from './controller/OrderController';

// As rotas são os EndPoints. Ex: /brands (GET-index, POST-create) /brands/ID (GET-show PUT-update, DELETE-remove)

//Instancio o router do express
const routes = Router();


// ROTA BRAND

//Rota do index e post
//End Point 1
routes.route('/brands')
    .get(BrandController.index)
    .post(BrandController.create);

//Rota do GET, PUT e DELETE
//End Point 2
routes.route('/brands/:id')
    .get(BrandController.show)
    .put(BrandController.update)
    .delete(BrandController.remove);

// ROTA CATEGORY

//End Point 1   
routes.route('/categories')
    .get(CategoryController.index)
    .post(CategoryController.create);

//End Point 2
routes.route('/categories/:id')
    .get(CategoryController.show)
    .put(CategoryController.update)
    .delete(CategoryController.remove);

// ROTA PRODUCT

//End Point 1   
routes.route('/products')
.get(ProductController.index)
.post(ProductController.create);

//End Point 2
routes.route('/products/:id')
.get(ProductController.show)
.put(ProductController.update)
.delete(ProductController.remove);

// ROTA CUSTOMER

//End Point 1   
routes.route('/customers')
.get(CustomerController.index)
.post(CustomerController.create);

//End Point 2
routes.route('/customers/:id')
.get(CustomerController.show)
.put(CustomerController.update)
.delete(CustomerController.remove);

// ROTA ORDER

//End Point 1   
routes.route('/orders')
.get(OrderController.index)
.post(OrderController.create);

//End Point 2
routes.route('/orders/:id')
.get(OrderController.show)
.put(OrderController.canceled);

//Deixando pública a rota para a aplicação
export default routes;