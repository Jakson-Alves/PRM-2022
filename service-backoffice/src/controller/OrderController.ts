import { DataSource } from 'typeorm';
import { Order } from './../entity/Order';
import { Request, Response } from "express";
import { TypeORMError } from 'typeorm';

class OrderController {

    public async index(request: Request, response: Response) {
        try {
            
            const orders = await Order.find();

            return response.json(orders);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async create(request: Request, response: Response) {
        try {
            
            const order = await Order.save(request.body);

            return response.status(201).json(order);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async show(request: Request, response: Response) {
        try {
            
            const {id} = request.params;

            if (!id) {
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            const found = await Order.findOneBy({
                id: Number(id)
            });
            
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }

            return response.json(found);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async canceled(request: Request, response: Response) {
        try {
            //Pego o ID que foi enviado por request param (parametro)
            const {id} = request.params;

            //Verifico se veio parametro ID
            if (!id) {
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            //Busco a entity bo banco pelo ID
            const found = await Order.findOneBy({
                id: Number(id)
            });
            
            //Verifico se encontrou a found
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }
            
            //Determina a data de cancelamento
            //Esse campo define que o campo foi cancelado
            request.body.canceledDate = new Date();

            //Atualizo com os novos dados
            await Order.update(found.id, request.body);

            const novo = request.body;

            //Altero o ID pra o que veio no request
            novo.id = found.id;

            //Retorna a entidade encontrada
            return response.json(novo);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }
}

export default new OrderController();