import api from "./api";

const COORDENADORES_URL = "/professores/coordenadores";
const PROFESSORES_URL = "/professores";
export const getCoordenadores = () => {
  return api.get(COORDENADORES_URL);
};

export const promoteProfessor = (professorId, cursoId) => {
  return api.put(`${PROFESSORES_URL}/${professorId}/coordenador/${cursoId}`);
};

export const updateCoordenador = (id, professorData) => {
  return api.put(`${PROFESSORES_URL}/${id}`, professorData);
};

export const removeCoordenadorRole = (id) => {
  return api.delete(`${PROFESSORES_URL}/${id}/coordenador`);
};

export const getCoordenadorById = (id) => {
  return api.get(`${PROFESSORES_URL}/${id}`);
};

export const getProfessores = () => {
  return api.get(PROFESSORES_URL);
};

export const getCursos = () => {
  return api.get("/cursos");
};
