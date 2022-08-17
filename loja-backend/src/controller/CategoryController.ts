import { Category } from './../entity/Category';
import { Request, Response } from "express";
import { TypeORMError } from 'typeorm';

class CategoryController {

    public async index(request: Request, response: Response) {
        try {
            //Buscar todos os registrados do banco de dados (select * from tabela)
            //await -> faz aguardar até a requisição terminar
            const categories = await Category.find();

            //Retorna a lista
            return response.json(categories);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }

    }

    public async create(request: Request, response: Response) {
        try {
            //Salvo no banco a entidade que veio na requisição
            const category = await Category.save(request.body);

            //Retorna a entidade inserida
            return response.status(201).json(category);

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
            const found = await Category.findOneBy({
                id: Number(id)
            });
            
            //Verifico se encontrou a category
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
            const found = await Category.findOneBy({
                id: Number(id)
            });
            
            //Verifico se encontrou a found
            if (!found) {
                return response.status(404).json({message: 'Recurso não encontrado'})
            }

            //Atualizo com os novos dados
            const category = await Category.update(found.id, request.body);

            //Retorna a entidade encontrada
            return response.json(category);

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
            const found = await Category.findOneBy({
                id: Number(id)
            });
            
            //Verifico se encontrou a category
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

export default new CategoryController();