import api from "./api";

const API_URL = "/alunos";

export const getAlunos = () => {
  return api.get(API_URL);
};

export const getAlunoById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

export const createAluno = (alunoData) => {
  return api.post(API_URL, alunoData);
};

export const updateAluno = (id, alunoData) => {
  return api.put(`${API_URL}/${id}`, alunoData);
};

export const deleteAluno = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const inscreverEmMonitoria = (monitoriaId) => {
  return api.post(`/monitorias/${monitoriaId}/inscrever-se`);
};

export const getMinhasInscricoes = () => {
  return api.get("/alunos/minhas-inscricoes");
};
