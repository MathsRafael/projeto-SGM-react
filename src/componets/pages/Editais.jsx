import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as processoSeletivoService from "../services/processoSeletivoService";
import Button from "../form/Button";

export default function Editais() {
  const navigate = useNavigate();
  const [editais, setEditais] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    processoSeletivoService
      .getProcessosSeletivos()
      .then((response) => setEditais(response.data))
      .catch((error) => {
        console.error("Erro ao buscar editais:", error);
        setErro("Não foi possível carregar os editais no momento.");
      })
      .finally(() => setCarregando(false));
  }, []);

  if (carregando)
    return <p className="text-center mt-4">Carregando editais...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Editais de Monitoria
      </h1>

      {editais.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum edital de monitoria disponível no momento.
        </p>
      ) : (
        <div className="space-y-4">
          {editais.map((edital) => (
            <div
              key={edital.id}
              className="p-5 border rounded-lg shadow-md flex justify-between items-center bg-white"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {edital.titulo}
                </h2>
                <p className="text-sm text-gray-600">
                  Inscrições de{" "}
                  {new Date(edital.dataInicioInscricoes).toLocaleDateString(
                    "pt-BR",
                    { timeZone: "UTC" }
                  )}{" "}
                  até{" "}
                  {new Date(edital.dataFimInscricoes).toLocaleDateString(
                    "pt-BR",
                    { timeZone: "UTC" }
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    edital.status === "ABERTO"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {edital.status === "ABERTO"
                    ? "Inscrições Abertas"
                    : "Inscrições Encerradas"}
                </span>
                <Button onClick={() => navigate(`/editais/${edital.id}`)}>
                  Visualizar Vagas
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
