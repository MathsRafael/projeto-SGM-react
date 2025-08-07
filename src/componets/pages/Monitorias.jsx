import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as monitoriaService from "../services/monitoriaService";
import Button from "../form/Button";

export default function Monitorias() {
  const navigate = useNavigate();
  const [monitorias, setMonitorias] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarMonitorias();
  }, []);

  const carregarMonitorias = () => {
    setCarregando(true);
    monitoriaService
      .getMonitorias()
      .then((response) => setMonitorias(response.data))
      .catch((error) => {
        console.error("Erro ao carregar monitorias:", error);
        setErro("Erro ao carregar a lista de monitorias.");
      })
      .finally(() => setCarregando(false));
  };

  const handleDeletar = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta monitoria?")) {
      monitoriaService
        .deleteMonitoria(id)
        .then(() => setMonitorias(monitorias.filter((m) => m.id !== id)))
        .catch((err) => alert("Erro ao excluir a monitoria."));
    }
  };

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Monitorias</h1>
        <Button onClick={() => navigate("/monitorias/novo")}>
          Criar Monitoria
        </Button>
      </div>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left">Disciplina</th>
            <th className="p-3 border-b text-left">Professor Responsável</th>
            <th className="p-3 border-b text-left">Vagas</th>
            <th className="p-3 border-b text-left">Carga Horária</th>
            <th className="p-3 border-b text-left">Inscritos</th>
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
              <td className="p-3 border-b">
                {monitoria.monitoriaInscritosResponseDTO?.length || 0}
              </td>
              <td className="p-3 border-b text-center space-x-2">
                <Button
                  onClick={() =>
                    navigate(`/monitorias/visualizar/${monitoria.id}`)
                  }
                >
                  Visualizar
                </Button>
                <Button
                  onClick={() => navigate(`/monitorias/editar/${monitoria.id}`)}
                  color="color"
                >
                  Editar
                </Button>
                <Button onClick={() => handleDeletar(monitoria.id)} color="red">
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
