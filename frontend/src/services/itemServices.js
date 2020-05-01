import axios from 'axios';
import { API_URL } from '../app_config';

export const listAll = async (categoryId) => {
  const url = `/categories/${categoryId}/items`;
  return await query(url);
}

export const getById = async (categoryId, itemId) => {
  const url = `/categories/${categoryId}/items/${itemId}`;
  return await query(url);
}

export const addNew = async (categoryId, data) => {
  const url = `/categories/${categoryId}/items`;
  const token = localStorage.getItem('id_token');
  const response = await axios.post(url, data, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}

export const udpate = async (categoryId, itemId, data) => {
  const url = `/categories/${categoryId}/items/${itemId}`;
  const token = localStorage.getItem('id_token');
  const response = await axios.patch(url, data, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}

export const remove = async (categoryId, itemId) => {
  const url = `/categories/${categoryId}/items/${itemId}`;
  const token = localStorage.getItem('id_token');
  const response = await axios.patch(url, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}

const query = async (url) => {
  const token = localStorage.getItem('id_token');
  const response = await axios.get(`${API_URL}/${url}`, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}