import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as cursoService from "../services/cursoService";
import * as instituicaoService from "../services/instituicaoService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function NovoCurso() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    duracao: "",
    nivelString: "",
    instituicaoId: "",
  });
  const [instituicoes, setInstituicoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    instituicaoService
      .getInstituicoes()
      .then((response) => {
        setInstituicoes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar instituições", error);
        setErro("Não foi possível carregar a lista de instituições.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro(null);
    console.log("Estado do formulário:", form);

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
      .createCurso(form)
      .then(() => {
        navigate("/cursos");
      })
      .catch((error) => {
        console.error("Erro ao criar curso:", error);
        setErro("Não foi possível salvar o curso. Tente novamente.");
      });
  };

  const niveisDeCurso = [
    "GRADUACAO",
    "TECNICO",
    "MESTRADO",
    "DOUTORADO",
    "OUTRO",
  ];

  return (
    <div className="flex justify-center mt-10">
      {}
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Novo Curso</h2>

        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

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
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
