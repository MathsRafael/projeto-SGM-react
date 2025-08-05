import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as alunoService from "../services/alunoService";
import Button from "../form/Button";

export default function Alunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarAlunos();
  }, []);

  function carregarAlunos() {
    setCarregando(true);
    alunoService
      .getAlunos()
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos:", error);
        setErro("Erro ao carregar a lista de alunos.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  function deletarAluno(id) {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      alunoService
        .deleteAluno(id)
        .then(() => {
          setAlunos(alunos.filter((aluno) => aluno.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao deletar aluno:", error);
          alert("Erro ao deletar aluno.");
        });
    }
  }

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Alunos</h1>
      </div>

      {alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Nome</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Matrícula
              </th>
              <th className="p-3 border-b border-gray-300 text-left">Email</th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{aluno.nome}</td>
                <td className="p-3 border-b border-gray-300">
                  {aluno.matricula}
                </td>
                <td className="p-3 border-b border-gray-300">{aluno.email}</td>
                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <Button
                    onClick={() => navigate(`/alunos/editar/${aluno.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>
                  <Button onClick={() => deletarAluno(aluno.id)} color="red">
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
