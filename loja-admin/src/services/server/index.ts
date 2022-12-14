import { IBrand } from '@typesCustom';
import { ICredential } from '@typesCustom';
import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3300'
});

//ENDPOINT dos serviços
const _ACCOUNT = '/account/admin';
const _BACKOFFICE = '/backoffice';

// Método Brands
const listBrands = () => (api.get(`${_BACKOFFICE}/brands`));
const createBrand = (brand: IBrand) => (api.post(`${_BACKOFFICE}/brands`, brand));
const updateBrand = (brand: IBrand) => (api.put(`${_BACKOFFICE}/brands/${brand.id}`, brand));
const deleteBrand = (brand: IBrand) => (api.delete(`${_BACKOFFICE}/brands/${brand.id}`));

//Criando método Account
const signInAdmin = async (credential: ICredential) => {
    try {

        const result = await api.post(`${_ACCOUNT}/signin`, credential);

        return new Promise ( resolve => {
            resolve(result.data)
        })

    } catch (e) {
        const error = e as AxiosError;

        return new Promise ((resolve,reject) => {
            reject(error.response?.data);
        });
    }
}

export {
    listBrands,
    signInAdmin,
    createBrand,
    updateBrand,
    deleteBrand
}