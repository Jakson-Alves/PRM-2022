import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//Criando classe Category (Categoria)
@Entity() 
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn() //fica um auto-incremento
    id: number; 

    @Column({nullable: false, length: 50})
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

