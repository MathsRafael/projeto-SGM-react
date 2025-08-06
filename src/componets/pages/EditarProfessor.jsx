import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as professorService from "../services/professorService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function EditarProfessor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    emailAcademico: "",
    matricula: "",
  });
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    professorService
      .getProfessorById(id)
      .then((response) => {
        const prof = response.data;
        setForm({
          nome: prof.nome || "",
          email: prof.email || "",
          emailAcademico: prof.emailAcademico || "",
          matricula: prof.matricula || "",
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar dados do professor:", error);
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
    professorService
      .updateProfessor(id, form)
      .then(() => {
        navigate("/professores");
      })
      .catch((error) => {
        console.error("Erro ao editar professor:", error);
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
        <h2 className="text-2xl font-bold mb-4">Editar Professor</h2>
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
          required
        />
        <Campo
          label="Matrícula"
          name="matricula"
          value={form.matricula}
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
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
