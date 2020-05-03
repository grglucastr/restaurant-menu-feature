import axios from 'axios';
import { API_URL } from '../app_config';

export const listAll = async () => {
  const url = `/items`;
  return await query(url);
}

export const getById = async (itemId) => {
  const url = `/items/${itemId}`;
  return await query(url);
}

export const addNew = async (data) => {
  const url = `${API_URL}/items`;
  const token = localStorage.getItem('id_token');
  const response = await axios.post(url, data, { headers: {'Authorization':'Bearer ' + token}});
  return await response.data;
}

export const update = async (itemId, data) => {
  const url = `${API_URL}/items/${itemId}`;
  const token = localStorage.getItem('id_token');
  const response = await axios.patch(url, data, { headers: {'Authorization':'Bearer ' + token}});
  return await response.data;
}

export const remove = async (itemId) => {
  const url = `${API_URL}/items/${itemId}`;
  const token = localStorage.getItem('id_token');
  const response = await axios.delete(url, { headers: {'Authorization':'Bearer ' + token}});
  return await response.data;
}

export const getSignedUrl = async (itemId) => {
  const url = `${API_URL}/items/${itemId}/attachment`;
  const token = localStorage.getItem('id_token');
  console.log("token signed", token);
  
  const response = await axios.post(url, {}, { headers: {'Authorization':'Bearer ' + token}});
  return await response.data;
}

export const updatePhoto = async (url, data) => {
  const response = await axios.put(url, data,{
    headers: {
      'Content-Type': data.type
    }
});
  return await response.data;
}

const query = async (url) => {
  const token = localStorage.getItem('id_token');
  const response = await axios.get(`${API_URL}${url}`, { headers: {'Authorization':'Bearer ' + token}});
  return await response.data;
}