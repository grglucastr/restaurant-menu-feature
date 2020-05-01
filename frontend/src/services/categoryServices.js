import axios from 'axios';
import { API_URL } from '../app_config';

export const listAll = async () => {
  const url = `/categories`;
  return await query(url);
}

export const getById = async (id) => {
  const url = `/categories/${id}`;
  return await query(url);
}

export const addNew = async (data) => {
  const token = localStorage.getItem('id_token');
  const response = await axios.post(`${API_URL}/categories`, data, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}

export const udpate = async (id, data) => {
  const url = `${API_URL}/categories/${id}`;
  const token = localStorage.getItem('id_token');
  const response = await axios.patch(url, data, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}

export const remove = async (id) => {
  const url = `${API_URL}/categories/${id}`;
  const token = localStorage.getItem('id_token');
  const response = await axios.patch(url, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}

const query = async (url) => {
  const token = localStorage.getItem('id_token');
  const response = await axios.get(`${API_URL}/${url}`, {headers: 'Authorization:Bearer ' + token});
  return await response.data;
}