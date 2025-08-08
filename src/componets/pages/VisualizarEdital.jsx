import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as processoSeletivoService from "../services/processoSeletivoService";
import Button from "../form/Button";

export default function VisualizarEdital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edital, setEdital] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    processoSeletivoService
      .getProcessoSeletivoById(id)
      .then((response) => {
        setEdital(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do edital:", error);
        setErro("Não foi possível carregar os detalhes do edital.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;
  if (!edital)
    return <p className="text-center mt-4">Dados do edital não encontrados.</p>;

  const monitorias = edital.monitorias || [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{edital.titulo}</h1>
        <Button
          color="color"
          type="button"
          onClick={() => navigate("/processos-seletivos")}
        >
          Voltar
        </Button>
      </div>

      <div className="p-4 border rounded bg-gray-50 mb-6">
        <h2 className="text-xl font-semibold mb-2">Descrição do Edital</h2>
        <p>{edital.descricao || "Nenhuma descrição fornecida."}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Monitoria Disponiveis</h2>

      {monitorias.length === 0 ? (
        <p>Nenhuma monitoria foi vinculada a este edital ainda.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">Disciplina</th>
              <th className="p-3 border-b text-left">Professor Responsável</th>
              <th className="p-3 border-b text-left">Vagas</th>
              <th className="p-3 border-b text-left">Carga Horária</th>
              <th className="p-3 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {monitorias.map((monitoria) => (
              <tr key={monitoria.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  {monitoria.disciplinaResponseDTO?.nome || "N/A"}
                </td>
                <td className="p-3 border-b">
                  {monitoria.professorResponseDTO?.nome || "N/A"}
                </td>

                <td className="p-3 border-b">{monitoria.numeroVaga}</td>
                <td className="p-3 border-b">{monitoria.cargaHoraria}</td>
                <td className="p-3 border-b text-center">
                  <Button
                    onClick={() =>
                      navigate(`/monitorias/visualizar/${monitoria.id}`, {
                        state: {
                          from: `/processos-seletivos/visualizar/${edital.id}`,
                        },
                      })
                    }
                  >
                    Visualizar
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
