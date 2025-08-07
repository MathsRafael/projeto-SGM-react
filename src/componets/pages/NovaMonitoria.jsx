import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as monitoriaService from "../services/monitoriaService";
import * as processoSeletivoService from "../services/processoSeletivoService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function NovaMonitoria() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    disciplinaId: "",
    numeroVaga: 1,
    cargaHoraria: 40,
    processoSeletivoId: "",
  });
  const [disciplinas, setDisciplinas] = useState([]);
  const [processosSeletivos, setProcessosSeletivos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    Promise.all([
      monitoriaService.getDisciplinas(),
      processoSeletivoService.getProcessosSeletivos(),
    ])
      .then(([disciplinasResponse, processosResponse]) => {
        setDisciplinas(disciplinasResponse.data);
        setProcessosSeletivos(processosResponse.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados", err);
        setErro("Não foi possível carregar os dados necessários.");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    monitoriaService
      .createMonitoria(form)
      .then(() => navigate("/monitorias"))
      .catch((err) => {
        console.error("Erro ao criar monitoria:", err);
        setErro("Erro ao salvar a vaga de monitoria.");
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Nova Vaga de Monitoria</h2>
        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">
            Edital (Processo Seletivo)
          </label>
          <select
            name="processoSeletivoId"
            value={form.processoSeletivoId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] w-full"
            required
          >
            <option value="">Selecione um edital</option>
            {processosSeletivos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Disciplina</label>
          <select
            name="disciplinaId"
            value={form.disciplinaId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] w-full"
            required
          >
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
        </div>

        <Campo
          label="Vagas Ofertadas"
          name="numeroVaga"
          type="number"
          min="1"
          value={form.numeroVaga}
          onChange={handleChange}
          required
        />
        <Campo
          label="Carga Horária Semanal"
          name="cargaHoraria"
          type="number"
          min="1"
          value={form.cargaHoraria}
          onChange={handleChange}
          required
        />

        <div className="flex justify-center gap-2 mt-4">
          <Button
            type="button"
            color="color"
            onClick={() => navigate("/monitorias")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar Vaga</Button>
        </div>
      </form>
    </div>
  );
}
