import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as professorService from "../services/professorService";
import Button from "../form/Button";

export default function Professores() {
  const navigate = useNavigate();
  const [professores, setProfessores] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarProfessores();
  }, []);

  function carregarProfessores() {
    setCarregando(true);
    professorService
      .getProfessores()
      .then((response) => {
        setProfessores(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar professores:", error);
        setErro("Erro ao carregar a lista de professores.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  function deletarProfessor(id) {
    if (window.confirm("Tem certeza que deseja excluir este professor?")) {
      professorService
        .deleteProfessor(id)
        .then(() => {
          setProfessores(professores.filter((prof) => prof.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao deletar professor:", error);
          alert("Erro ao deletar professor.");
        });
    }
  }

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Professores</h1>
        <Button onClick={() => navigate("/professores/novo")}>
          Novo Professor
        </Button>
      </div>

      {professores.length === 0 ? (
        <p>Nenhum professor cadastrado.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Nome</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Matrícula
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Email Pessoal
              </th>
              <th className="p-3 border-b border-gray-300 text-left">
                Email Acadêmico
              </th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {professores.map((prof) => (
              <tr key={prof.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{prof.nome}</td>
                <td className="p-3 border-b border-gray-300">
                  {prof.matricula}
                </td>
                <td className="p-3 border-b border-gray-300">{prof.email}</td>
                <td className="p-3 border-b border-gray-300">
                  {prof.emailAcademico || "N/A"}
                </td>
                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <Button
                    onClick={() => navigate(`/professores/editar/${prof.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>

                  <Button onClick={() => deletarProfessor(prof.id)} color="red">
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
