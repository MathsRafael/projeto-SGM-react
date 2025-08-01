import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cursoService from "../services/cursoService";
import Button from "../form/Button";

export default function Cursos() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarCursos();
  }, []);

  function carregarCursos() {
    setCarregando(true);
    cursoService
      .getCursos()
      .then((response) => {
        setCursos(response.data);
        setErro(null);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
        setErro("Erro ao carregar a lista de cursos.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  function deletar(id) {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      cursoService
        .deleteCurso(id)
        .then(() => {
          setCursos(cursos.filter((c) => c.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao excluir curso:", error);
          alert(
            "Erro ao excluir o curso. Verifique se ele não está sendo usado."
          );
        });
    }
  }

  if (carregando)
    return <p className="text-center mt-4">Carregando cursos...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cursos</h1>
        <Button onClick={() => navigate("/cursos/novo")}>Novo Curso</Button>
      </div>

      {cursos.length === 0 ? (
        <p>Nenhum curso cadastrado.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b border-gray-300 text-left">Nome</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Duração (Semestres)
              </th>
              <th className="p-3 border-b border-gray-300 text-left">Nível</th>
              <th className="p-3 border-b border-gray-300 text-left">
                Instituição
              </th>
              <th className="p-3 border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{curso.nome}</td>
                <td className="p-3 border-b border-gray-300">
                  {curso.duracao}
                </td>
                {/* ALTERADO AQUI */}
                <td className="p-3 border-b border-gray-300">{curso.nivel}</td>
                {/* ALTERADO AQUI */}
                <td className="p-3 border-b border-gray-300">
                  {curso.instituicaoResponseDTO?.nome || "N/A"}
                </td>
                <td className="p-3 border-b border-gray-300 text-center space-x-2">
                  <Button
                    onClick={() => navigate(`/cursos/editar/${curso.id}`)}
                    color="color"
                  >
                    Editar
                  </Button>
                  <Button onClick={() => deletar(curso.id)} color="red">
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
