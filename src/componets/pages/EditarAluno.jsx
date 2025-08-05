import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as alunoService from "../services/alunoService";
import * as instituicaoService from "../services/instituicaoService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function EditarAluno() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    emailAcademico: "",
    instituicaoId: "",
  });
  const [instituicoes, setInstituicoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      alunoService.getAlunoById(id),
      instituicaoService.getInstituicoes(),
    ])
      .then(([alunoResponse, instituicoesResponse]) => {
        const aluno = alunoResponse.data;
        setForm({
          nome: aluno.nome || "",
          email: aluno.email || "",
          emailAcademico: aluno.emailAcademico || "",
          instituicaoId: aluno.instituicaoResponseDTO?.id || "",
        });
        setInstituicoes(instituicoesResponse.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar dados:", error);
        setErro("Não foi possível carregar os dados para edição.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro(null);
    alunoService
      .updateAluno(id, form)
      .then(() => {
        navigate("/alunos");
      })
      .catch((error) => {
        console.error("Erro ao editar aluno:", error);
        setErro("Não foi possível salvar as alterações.");
      });
  };

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro && carregando)
    return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Aluno</h2>
        {erro && !carregando && (
          <p className="text-red-500 mb-4 text-center">{erro}</p>
        )}

        <Campo
          label="Nome Completo"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <Campo
          label="E-mail Pessoal"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Campo
          label="E-mail Acadêmico"
          name="emailAcademico"
          type="email"
          value={form.emailAcademico}
          onChange={handleChange}
        />

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Instituição</label>
          <select
            name="instituicaoId"
            value={form.instituicaoId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione uma instituição</option>
            {instituicoes.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            type="button"
            color="color"
            onClick={() => navigate("/alunos")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
