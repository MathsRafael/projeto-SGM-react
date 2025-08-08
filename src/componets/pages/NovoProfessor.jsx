import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as professorService from "../services/professorService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function NovoProfessor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    emailAcademico: "",
    matricula: "",
    cpf: "",
    senha: "",
  });
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro(null);
    professorService
      .createProfessor(form)
      .then(() => {
        navigate("/professores");
      })
      .catch((error) => {
        console.error("Erro ao criar professor:", error);
        setErro("Não foi possível salvar o professor. Verifique os dados.");
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Novo Professor</h2>
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
        <Campo
          label="Senha Provisória"
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <div className="flex justify-center gap-2 mt-4">
          <Button
            type="button"
            color="color"
            onClick={() => navigate("/professores")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
