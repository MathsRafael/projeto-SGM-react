import api from "./api";

const API_URL = "/instituicoes";

export const getInstituicoes = () => {
  return api.get(API_URL);
};
