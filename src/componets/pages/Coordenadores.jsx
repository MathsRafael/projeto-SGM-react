import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as coordenadorService from "../services/coordenadorService";
import Button from "../form/Button";

export default function Coordenadores() {
  const navigate = useNavigate();
  const [coordenadores, setCoordenadores] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    coordenadorService
      .getCoordenadores()
      .then((response) => setCoordenadores(response.data))
      .catch((error) => {
        console.error("Erro ao buscar coordenadores:", error);
        setErro("Erro ao carregar a lista de coordenadores.");
      })
      .finally(() => setCarregando(false));
  }, []);

  function removerCargo(id) {
    if (
      window.confirm(
        "Tem certeza que deseja remover o cargo deste coordenador? Ele voltará a ser apenas um professor."
      )
    ) {
      coordenadorService
        .removeCoordenadorRole(id)
        .then(() => setCoordenadores(coordenadores.filter((c) => c.id !== id)))
        .catch((error) => {
          console.error("Erro ao remover cargo:", error);
          alert("Erro ao remover o cargo do coordenador.");
        });
    }
  }

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Coordenadores</h1>
        <Button onClick={() => navigate("/professores/coordenadores/novo")}>
          Novo Coordenador
        </Button>
      </div>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b border-gray-300 text-left">Nome</th>
            <th className="p-3 border-b border-gray-300 text-left">
              Matrícula
            </th>
            <th className="p-3 border-b border-gray-300 text-left">
              Email Acadêmico
            </th>
            <th className="p-3 border-b border-gray-300 text-left">
              Curso Coordenado
            </th>
            <th className="p-3 border-b border-gray-300 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {coordenadores.map((coord) => (
            <tr key={coord.id} className="hover:bg-gray-50">
              <td className="p-3 border-b border-gray-300">{coord.nome}</td>
              <td className="p-3 border-b border-gray-300">
                {coord.matricula}
              </td>
              <td className="p-3 border-b border-gray-300">
                {coord.emailAcademico || "N/A"}
              </td>
              <td className="p-3 border-b border-gray-300">
                {coord.cursosCoordenados && coord.cursosCoordenados.length > 0
                  ? coord.cursosCoordenados.join(", ")
                  : "N/A"}
              </td>
              <td className="p-3 border-b border-gray-300 text-center space-x-2">
                <Button
                  onClick={() => navigate(`/professores/editar/${coord.id}`)}
                  color="color"
                >
                  Editar
                </Button>
                <Button onClick={() => removerCargo(coord.id)} color="red">
                  Remover Cargo
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
