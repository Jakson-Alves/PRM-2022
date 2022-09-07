import { Product } from './../entity/Product';
import { Request, Response } from "express";
import { TypeORMError } from 'typeorm';

class ProductController {

    public async index(request: Request, response: Response) {
        try {
            //Buscar todos os registrados do banco de dados (select * from tabela)
            //await -> faz aguardar até a requisição terminar
            const products = await Product.find();

            //Retorna a lista
            return response.json(products);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async create(request: Request, response: Response) {
        try {
            //Salvo no banco a entidade que veio na requisição
            const product = await Product.save(request.body);

            //Retorna a entidade inserida
            return response.status(201).json(product);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async show(request: Request, response: Response) {
        try {
            //Pego o ID que foi enviado por request param (parametro)
            const {id} = request.params;

            //Verifico se veio parametro ID
            if (!id) {
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            //Busco a entity bo banco pelo ID
            const found = await Product.findOneBy({
                id: Number(id)
            });
            
            //Verifico se encontrou a product
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }

            //Retorna a entidade encontrada
            return response.json(found);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async update(request: Request, response: Response) {
        try {
            //Pego o ID que foi enviado por request param (parametro)
            const {id} = request.params;

            //Verifico se veio parametro ID
            if (!id) {
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            //Busco a entity bo banco pelo ID
            const found = await Product.findOneBy({
                id: Number(id)
            });
            
            //Verifico se encontrou a found
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }

            //Atualizo com os novos dados
            await Product.update(found.id, request.body);

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

    public async remove(request: Request, response: Response) {
        try {
            //Pego o ID que foi enviado por request param (parametro)
            const {id} = request.params;

            //Verifico se veio parametro ID
            if (!id) {
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            //Busco a entity bo banco pelo ID
            const found = await Product.findOneBy({
                id: Number(id)
            });
            
            //Verifico se encontrou a product
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }

            //Removo o registro baseado no ID
            await found.remove();

            //Retorna status 204 -> Sem Retorno
            return response.status(204).json();

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }
}

export default new ProductController();