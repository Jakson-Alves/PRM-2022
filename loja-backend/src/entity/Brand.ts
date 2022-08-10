import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

//Criando classe Brand (identidade)
@Entity() 
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn() //fica um auto-incremento
    id: number; 

    @Column({nullable: false, length: 50})
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

