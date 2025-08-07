import api from "./api";

const API_URL = "/processos-seletivos";
export const getProcessosSeletivos = () => {
  return api.get(API_URL);
};

export const getProcessoSeletivoById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const createProcessoSeletivo = (editalData) => {
  return api.post(API_URL, editalData);
};

export const updateProcessoSeletivo = (id, editalData) => {
  return api.put(`${API_URL}/${id}`, editalData);
};

export const deleteProcessoSeletivo = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const closeProcessoSeletivo = (id) => {
  return api.put(`${API_URL}/${id}/fechar`);
};
