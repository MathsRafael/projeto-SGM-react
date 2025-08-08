import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as processoSeletivoService from "../services/processoSeletivoService";
import * as alunoService from "../services/alunoService";
import Button from "../form/Button";
import { useAuth } from "../AuthContext";

export default function DetalhesEdital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profiles } = useAuth();
  const [edital, setEdital] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const carregarEdital = () => {
    setCarregando(true);
    processoSeletivoService
      .getProcessoSeletivoById(id)
      .then((response) => setEdital(response.data))
      .catch((error) => {
        console.error("Erro ao carregar detalhes do edital:", error);
        setErro("Não foi possível carregar os detalhes do edital.");
      })
      .finally(() => setCarregando(false));
  };

  useEffect(() => {
    carregarEdital();
  }, [id]);

  const handleInscricao = (monitoriaId) => {
    if (window.confirm("Confirmar inscrição nesta vaga de monitoria?")) {
      alunoService
        .inscreverEmMonitoria(monitoriaId)
        .then(() => {
          alert("Inscrição realizada com sucesso!");
          carregarEdital();
        })
        .catch((err) => {
          const mensagemErro =
            err.response?.data?.message ||
            "Erro ao realizar inscrição. Você já pode estar inscrito nesta vaga.";
          alert(mensagemErro);
        });
    }
  };

  const getStatusInscricao = (monitoria) => {
    if (!user || !monitoria.monitoriaInscritosResponseDTO) {
      return false;
    }
    return monitoria.monitoriaInscritosResponseDTO.some(
      (inscricao) => inscricao.alunoResponseDTO?.id === user.id
    );
  };

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro) return <p className="text-red-500 text-center mt-4">{erro}</p>;
  if (!edital) return <p>Edital não encontrado.</p>;

  const isAluno = profiles.includes("aluno");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{edital.titulo}</h1>
        <Button
          color="color"
          type="button"
          onClick={() => navigate("/editais")}
        >
          Voltar
        </Button>
      </div>
      <div className="p-4 border rounded bg-gray-50 mb-6">
        <h2 className="text-xl font-semibold mb-2">Descrição</h2>
        <p>{edital.descricao}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Vagas de Monitoria Disponíveis
      </h2>

      <table className="min-w-full border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b text-left">Disciplina</th>
            <th className="p-3 border-b text-left">Professor</th>
            <th className="p-3 border-b text-left">Vagas</th>
            <th className="p-3 border-b text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {edital.monitorias.map((monitoria) => {
            const jaInscrito = getStatusInscricao(monitoria);
            return (
              <tr key={monitoria.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">
                  {monitoria.disciplinaResponseDTO?.nome}
                </td>
                <td className="p-3 border-b">
                  {monitoria.professorResponseDTO?.nome}
                </td>
                <td className="p-3 border-b">{monitoria.numeroVaga}</td>
                <td className="p-3 border-b text-center">
                  {isAluno &&
                    edital.status === "ABERTO" &&
                    (jaInscrito ? (
                      <span className="font-semibold text-green-600">
                        Inscrito
                      </span>
                    ) : (
                      <Button onClick={() => handleInscricao(monitoria.id)}>
                        Inscrever-se
                      </Button>
                    ))}

                  {isAluno && edital.status === "FECHADO" && (
                    <Button
                      onClick={() =>
                        navigate(`/monitorias/visualizar/${monitoria.id}`, {
                          state: { from: `/editais/${edital.id}` },
                        })
                      }
                    >
                      Ver Resultado
                    </Button>
                  )}
                  {!isAluno && (
                    <Button
                      onClick={() =>
                        navigate(`/monitorias/visualizar/${monitoria.id}`, {
                          state: { from: `/editais/${edital.id}` },
                        })
                      }
                    >
                      Visualizar Inscritos
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
