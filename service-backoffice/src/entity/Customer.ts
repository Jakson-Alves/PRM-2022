import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//Criando classe Customer (identidade)
@Entity() 
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn() //fica um auto-incremento
    id: number; 

    @Column({nullable: false, length: 50})
    name: string;

    @Column({length: 255})
    address: string;
    
    @Column({length: 8})
    zipcode: string;

    @Column({length: 2})
    state: string;
    
    @Column({length: 50})
    city: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

