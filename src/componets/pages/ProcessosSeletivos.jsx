import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as processoSeletivoService from "../services/processoSeletivoService";
import Button from "../form/Button";

export default function ProcessosSeletivos() {
  const navigate = useNavigate();
  const [editais, setEditais] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const carregarEditais = () => {
    setCarregando(true);
    processoSeletivoService
      .getProcessosSeletivos()
      .then((response) => setEditais(response.data))
      .catch((error) => {
        console.error("Erro:", error);
        setErro("Erro ao carregar a lista de editais.");
      })
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarEditais();
  }, []);

  const handleFechar = (id) => {
    if (
      window.confirm(
        "Tem certeza que deseja fechar este edital para novas inscrições? Esta ação não pode ser desfeita."
      )
    ) {
      processoSeletivoService
        .closeProcessoSeletivo(id)
        .then(() => carregarEditais())
        .catch((err) => alert("Erro ao fechar o edital."));
    }
  };

  const handleDeletar = (id) => {
    if (
      window.confirm(
        "Tem certeza que deseja EXCLUIR este edital? Todos os dados e inscrições relacionados serão perdidos."
      )
    ) {
      processoSeletivoService
        .deleteProcessoSeletivo(id)
        .then(() => setEditais(editais.filter((e) => e.id !== id)))
        .catch((err) => alert("Erro ao excluir o edital."));
    }
  };

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciar Editais</h1>
        <Button onClick={() => navigate("/processos-seletivos/novo")}>
          Criar Edital
        </Button>
      </div>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left">Título</th>
            <th className="p-3 border-b text-left">Início Inscrições</th>
            <th className="p-3 border-b text-left">Fim Inscrições</th>
            <th className="p-3 border-b text-left">Status</th>
            <th className="p-3 border-b text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {editais.map((edital) => (
            <tr key={edital.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{edital.titulo}</td>
              <td className="p-3 border-b">
                {new Date(edital.dataInicioInscricoes).toLocaleDateString(
                  "pt-BR",
                  { timeZone: "UTC" }
                )}
              </td>
              <td className="p-3 border-b">
                {new Date(edital.dataFimInscricoes).toLocaleDateString(
                  "pt-BR",
                  { timeZone: "UTC" }
                )}
              </td>
              <td className="p-3 border-b">
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    edital.status === "ABERTO"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {edital.status}
                </span>
              </td>
              <td className="p-3 border-b text-center space-x-2">
                <Button
                  onClick={() =>
                    navigate(`/processos-seletivos/visualizar/${edital.id}`)
                  }
                >
                  Visualizar
                </Button>
                {edital.status === "ABERTO" && (
                  <Button onClick={() => handleFechar(edital.id)} color="color">
                    Fechar Inscrições
                  </Button>
                )}

                <Button
                  onClick={() =>
                    navigate(`/processos-seletivos/editar/${edital.id}`)
                  }
                  color="color"
                >
                  Editar
                </Button>
                <Button onClick={() => handleDeletar(edital.id)} color="red">
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
