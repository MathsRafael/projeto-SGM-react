import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as monitoriaService from "../services/monitoriaService";
import Button from "../form/Button";

export default function VisualizarMonitoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monitoria, setMonitoria] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    monitoriaService
      .getMonitoriaById(id)
      .then((response) => {
        setMonitoria(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes da monitoria:", error);
        setErro("Não foi possível carregar os detalhes da monitoria.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;
  if (!monitoria)
    return (
      <p className="text-center mt-4">Dados da monitoria não encontrados.</p>
    );

  const inscritos = monitoria.monitoriaInscritosResponseDTO || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Monitoria de {monitoria.disciplinaResponseDTO?.nome}
        </h1>
        <Button
          color="color"
          type="button"
          onClick={() => navigate("/monitorias")}
        >
          Voltar
        </Button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Alunos Inscritos ({inscritos.length})
      </h2>

      {inscritos.length === 0 ? (
        <p>Nenhum aluno inscrito nesta monitoria ainda.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">Nome do Aluno</th>
              <th className="p-3 border-b text-left">Matrícula</th>
              <th className="p-3 border-b text-left">Email Acadêmico</th>
            </tr>
          </thead>
          <tbody>
            {inscritos.map((inscricao) => (
              <tr
                key={inscricao.alunoResponseDTO.id}
                className="hover:bg-gray-50"
              >
                <td className="p-3 border-b">
                  {inscricao.alunoResponseDTO.nome}
                </td>
                <td className="p-3 border-b">
                  {inscricao.alunoResponseDTO.matricula}
                </td>
                <td className="p-3 border-b">
                  {inscricao.alunoResponseDTO.emailAcademico}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
