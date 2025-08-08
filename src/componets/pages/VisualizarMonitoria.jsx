import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as monitoriaService from "../services/monitoriaService";
import Button from "../form/Button";

export default function VisualizarMonitoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [monitoria, setMonitoria] = useState(null);
  const [inscritosOrdenados, setInscritosOrdenados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    monitoriaService
      .getMonitoriaById(id)
      .then((response) => {
        const monitoriaData = response.data;
        setMonitoria(monitoriaData);
        const inscritos = monitoriaData.monitoriaInscritosResponseDTO || [];
        const ordenados = [...inscritos].sort(
          (a, b) =>
            (b.alunoResponseDTO.cre || 0) - (a.alunoResponseDTO.cre || 0)
        );
        setInscritosOrdenados(ordenados);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes da monitoria:", error);
        setErro("Não foi possível carregar os detalhes da monitoria.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [id]);

  const handleVoltar = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/monitorias");
    }
  };

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;
  if (!monitoria)
    return (
      <p className="text-center mt-4">Dados da monitoria não encontrados.</p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Monitoria de {monitoria.disciplinaResponseDTO?.nome}
        </h1>
        <Button color="color" type="button" onClick={handleVoltar}>
          Voltar
        </Button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Classificação dos Candidatos ({inscritosOrdenados.length})
      </h2>

      {inscritosOrdenados.length === 0 ? (
        <p>Nenhum aluno inscrito nesta monitoria ainda.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">Nome do Aluno</th>
              <th className="p-3 border-b text-left">Matrícula</th>
              <th className="p-3 border-b text-left">CRE</th>
              <th className="p-3 border-b text-left">Selecionado</th>
            </tr>
          </thead>
          <tbody>
            {inscritosOrdenados.map((inscricao, index) => (
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
                  {inscricao.alunoResponseDTO.cre?.toFixed(2) || "N/A"}
                </td>
                <td className="p-3 border-b">
                  {index < monitoria.numeroVaga ? (
                    <span className="font-bold text-green-600">Sim</span>
                  ) : (
                    <span className="text-gray-500">Não</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
