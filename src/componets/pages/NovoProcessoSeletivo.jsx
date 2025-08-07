import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as processoSeletivoService from "../services/processoSeletivoService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function NovoProcessoSeletivo() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    dataInicioInscricoes: "",
    dataFimInscricoes: "",
  });
  const [erro, setErro] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    processoSeletivoService
      .createProcessoSeletivo(form)
      .then(() => navigate("/processos-seletivos"))
      .catch((err) => {
        console.error(err);
        setErro("Erro ao salvar o edital. Verifique os dados.");
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Novo Edital</h2>
        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

        <Campo
          label="Título do Edital"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <label className="text-gray-600">Descrição</label>
        <br />
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="mt-0.5 mb-3 p-[8px] border-2 w-full rounded"
          rows="4"
        />

        <Campo
          label="Data de Início das Inscrições"
          name="dataInicioInscricoes"
          type="date"
          value={form.dataInicioInscricoes}
          onChange={handleChange}
          required
        />
        <Campo
          label="Data de Fim das Inscrições"
          name="dataFimInscricoes"
          type="date"
          value={form.dataFimInscricoes}
          onChange={handleChange}
          required
        />

        <div className="flex justify-center gap-2 mt-4">
          <Button
            type="button"
            color="color"
            onClick={() => navigate("/processos-seletivos")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}
