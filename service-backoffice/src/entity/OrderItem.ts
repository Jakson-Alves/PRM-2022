import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from './Order';
import { Product } from './Product';

@Entity()
export class OrderItem extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, {eager: true, nullable: false})
    customer: Order;

    @ManyToOne(() => Product, {eager: true, nullable: false})
    product: Product;

    @Column({nullable: false})
    amount: number;

    @Column('decimal',{nullable: false, precision: 10, scale: 2})
    value: number;

    @CreateDateColumn()
    invoicedDate: Date;

    @CreateDateColumn()
    canceledDate: Date;
}