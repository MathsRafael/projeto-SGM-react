import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as cursoService from "../services/cursoService";
import * as instituicaoService from "../services/instituicaoService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function EditarCurso() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    duracao: "",
    nivelString: "",
    instituicaoId: "",
  });
  const [instituicoes, setInstituicoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      cursoService.getCursoById(id),
      instituicaoService.getInstituicoes(),
    ])
      .then(([cursoResponse, instituicoesResponse]) => {
        const curso = cursoResponse.data;
        setForm({
          nome: curso.nome,
          duracao: curso.duracao,
          nivelString: curso.nivelCurso,
          instituicaoId: curso.instituicao?.id || "",
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

    if (
      !form.nome.trim() ||
      !form.duracao ||
      !form.nivelString ||
      !form.instituicaoId
    ) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

    cursoService
      .updateCurso(id, form)
      .then(() => {
        navigate("/cursos");
      })
      .catch((error) => {
        console.error("Erro ao editar curso:", error);
        setErro("Não foi possível salvar as alterações.");
      });
  };

  const niveisDeCurso = [
    "GRADUACAO",
    "TECNICO",
    "MESTRADO",
    "DOUTORADO",
    "OUTRO",
  ];

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;
  if (erro && carregando)
    return <p className="text-red-500 text-center mt-4">{erro}</p>;

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Curso</h2>

        {erro && !carregando && (
          <p className="text-red-500 mb-4 text-center">{erro}</p>
        )}

        <Campo
          label="Nome do Curso"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <Campo
          label="Duração (em semestres)"
          name="duracao"
          type="number"
          value={form.duracao}
          onChange={handleChange}
          required
        />

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Nível do Curso</label>
          <select
            name="nivelString"
            value={form.nivelString}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] focus:border-primaria focus:outline-none rounded w-full"
            required
          >
            <option value="">Selecione um nível</option>
            {niveisDeCurso.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>

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
            onClick={() => navigate("/cursos")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
