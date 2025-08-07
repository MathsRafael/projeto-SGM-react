import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as monitoriaService from "../services/monitoriaService";
import * as processoSeletivoService from "../services/processoSeletivoService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function EditarMonitoria() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    disciplinaId: "",
    professorId: "",
    numeroVaga: 1,
    cargaHoraria: "",
    processoSeletivoId: "",
  });
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [processosSeletivos, setProcessosSeletivos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([
      monitoriaService.getMonitoriaById(id),
      monitoriaService.getDisciplinas(),
      monitoriaService.getProfessores(),
      processoSeletivoService.getProcessosSeletivos(),
    ])
      .then(
        ([
          monitoriaResponse,
          disciplinasResponse,
          professoresResponse,
          processosResponse,
        ]) => {
          const monitoria = monitoriaResponse.data;
          setForm({
            disciplinaId: monitoria.disciplinaResponseDTO?.id || "",
            professorId: monitoria.professorResponseDTO?.id || "",
            numeroVaga: monitoria.numeroVaga || 1,
            cargaHoraria: monitoria.cargaHoraria || "",
            processoSeletivoId: monitoria.processoSeletivoResponseDTO?.id || "",
          });
          setDisciplinas(disciplinasResponse.data);
          setProfessores(professoresResponse.data);
          setProcessosSeletivos(processosResponse.data);
        }
      )
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setErro("Não foi possível carregar os dados para edição.");
      })
      .finally(() => setCarregando(false));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    monitoriaService
      .updateMonitoria(id, form)
      .then(() => navigate("/monitorias"))
      .catch((err) => setErro("Erro ao salvar as alterações."));
  };

  if (carregando) return <p className="text-center mt-4">Carregando...</p>;

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Vaga de Monitoria</h2>
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

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">
            Professor Responsável
          </label>
          <select
            name="professorId"
            value={form.professorId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] w-full"
            required
          >
            <option value="">Selecione um professor</option>
            {professores.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
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
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
