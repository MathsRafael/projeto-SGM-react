import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function RotaProtegida({ children, perfilPermitido }) {
  const { isAuthenticated, profiles, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/?erro=nao-autenticado" replace />;
  }

  const perfisPermitidos = Array.isArray(perfilPermitido)
    ? perfilPermitido
    : [perfilPermitido];
  const temPermissao = profiles.some((p) => perfisPermitidos.includes(p));

  if (temPermissao) {
    return children;
  } else {
    return <Navigate to="/?erro=acesso-negado" replace />;
  }
}

export default RotaProtegida;
