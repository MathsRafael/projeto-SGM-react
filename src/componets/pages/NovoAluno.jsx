import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as alunoService from "../services/alunoService.js";
import * as instituicaoService from "../services/instituicaoService.js";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function NovoAluno() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    matricula: "",
    email: "",
    emailAcademico: "",
    instituicaoId: "",
  });
  const [instituicoes, setInstituicoes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    instituicaoService
      .getInstituicoes()
      .then((res) => setInstituicoes(res.data))
      .catch(() => setErro("Erro ao carregar instituições."));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    alunoService
      .createAluno(form)
      .then(() => {
        navigate("/alunos");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar aluno:", error);
        setErro("Erro ao cadastrar aluno. Verifique os dados.");
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Novo Aluno</h2>
        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

        <Campo
          label="Nome Completo"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <Campo
          label="CPF"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          required
        />
        <Campo
          label="Matrícula"
          name="matricula"
          value={form.matricula}
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
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </div>
  );
}
