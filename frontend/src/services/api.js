import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPessoas = (filters = {}) => api.get('/pessoas/', { params: filters });
export const createPessoa = (data) => api.post('/pessoas/', data);
export const updatePessoa = (id, data) => api.put(`/pessoas/${id}/`, data);
export const deletePessoa = (id) => api.delete(`/pessoas/${id}/`);
export const calcularPesoIdeal = async (id) => {
    try {
      const response = await api.get(`/pessoas/${id}/peso-ideal/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao calcular peso ideal:', error);
      throw error;
    }
  };

export default api;