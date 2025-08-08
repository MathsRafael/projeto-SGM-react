import { useEffect, useState } from "react";
import * as alunoService from "../services/alunoService";

export default function MinhasInscricoes() {
  const [inscricoes, setInscricoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    alunoService
      .getMinhasInscricoes()
      .then((response) => {
        setInscricoes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar inscrições:", error);
        setErro("Não foi possível carregar suas inscrições.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Minhas Inscrições</h1>

      {inscricoes.length === 0 ? (
        <p>Você ainda não se inscreveu em nenhuma monitoria.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">Disciplina</th>
              <th className="p-3 border-b text-left">Professor Responsável</th>
              <th className="p-3 border-b text-left">Status do Edital</th>
              <th className="p-3 border-b text-left">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.map((inscricao, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border-b">{inscricao.nomeDisciplina}</td>
                <td className="p-3 border-b">{inscricao.nomeProfessor}</td>
                <td className="p-3 border-b">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      inscricao.statusEdital === "ABERTO"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {inscricao.statusEdital}
                  </span>
                </td>
                <td className="p-3 border-b">
                  {inscricao.statusEdital === "FECHADO" ? (
                    inscricao.foiSelecionado ? (
                      <span className="font-bold text-green-600">
                        Selecionado(a)
                      </span>
                    ) : (
                      <span className="text-red-600">Não Selecionado(a)</span>
                    )
                  ) : (
                    <span className="text-gray-500">Aguardando</span>
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
