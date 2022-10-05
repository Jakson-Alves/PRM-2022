import 'reflect-metadata';
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Brand } from "./entity/Brand";
import { Category } from "./entity/Category";
import { Customer } from './entity/Customer';
import { Order } from './entity/Order';
import { OrderItem } from './entity/OrderItem';
import { Product } from "./entity/Product";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "prmdb",
    synchronize: true,
    logging: true,
    entities: [Brand, Category, Product, Order, Customer, OrderItem],
});