import api from "./api";

const API_URL = "/monitorias";

export const getMonitorias = () => {
  return api.get(API_URL);
};

export const getMonitoriaById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const createMonitoria = (monitoriaData) => {
  return api.post(API_URL, monitoriaData);
};

export const updateMonitoria = (id, monitoriaData) => {
  return api.put(`${API_URL}/${id}`, monitoriaData);
};

export const deleteMonitoria = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getDisciplinas = () => {
  return api.get("/disciplinas");
};

export const getProfessores = () => {
  return api.get("/professores");
};
