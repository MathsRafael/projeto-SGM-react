import { useEffect, useState } from "react";
import * as professorService from "../services/professorService";
import { useNavigate } from "react-router-dom";
import Button from "../form/Button";

export default function MinhasMonitorias() {
  const navigate = useNavigate();
  const [monitorias, setMonitorias] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    professorService
      .getMinhasMonitorias()
      .then((res) => setMonitorias(res.data))
      .catch((err) => setErro("Não foi possível carregar suas monitorias."))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Minhas Monitorias</h1>
      {monitorias.length === 0 ? (
        <p>Nenhuma monitoria sob sua responsabilidade foi encontrada.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">Disciplina</th>
              <th className="p-3 border-b text-left">Edital</th>
              <th className="p-3 border-b text-left">Inscritos</th>
              <th className="p-3 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {monitorias.map((m) => (
              <tr key={m.id}>
                <td className="p-3 border-b">
                  {m.disciplinaResponseDTO?.nome}
                </td>
                <td className="p-3 border-b">
                  {m.processoSeletivoResponseDTO?.titulo}
                </td>
                <td className="p-3 border-b">
                  {m.monitoriaInscritosResponseDTO?.length || 0}
                </td>
                <td className="p-3 border-b text-center">
                  <Button
                    onClick={() => navigate(`/monitorias/visualizar/${m.id}`)}
                  >
                    Ver Inscritos
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
