import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as processoSeletivoService from "../services/processoSeletivoService";
import * as instituicaoService from "../services/instituicaoService";
import Button from "../form/Button.jsx";
import Campo from "../form/Campo.jsx";

export default function EditarProcessoSeletivo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    dataInicioInscricoes: "",
    dataFimInscricoes: "",
    instituicaoId: "",
  });

  const [instituicoes, setInstituicoes] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    instituicaoService
      .getInstituicoes()
      .then((res) => setInstituicoes(res.data))
      .catch(() => setErro("Erro ao carregar instituições."));
  }, []);

  useEffect(() => {
    processoSeletivoService
      .getProcessoSeletivoById(id)
      .then((res) => {
        const edital = res.data;
        setForm({
          titulo: edital.titulo,
          descricao: edital.descricao,
          dataInicioInscricoes: new Date(edital.dataInicioInscricoes)
            .toISOString()
            .split("T")[0],
          dataFimInscricoes: new Date(edital.dataFimInscricoes)
            .toISOString()
            .split("T")[0],
        });
      })
      .catch((err) => setErro("Erro ao carregar dados do edital."))
      .finally(() => setCarregando(false));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    processoSeletivoService
      .updateProcessoSeletivo(id, form)
      .then(() => navigate("/processos-seletivos"))
      .catch((err) => setErro("Erro ao salvar alterações."));
  };

  if (carregando) return <p>Carregando...</p>;

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Editar Edital</h2>
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
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Instituição</label>
          <select
            name="instituicaoId"
            value={form.instituicaoId}
            onChange={handleChange}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] w-full"
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
            onClick={() => navigate("/processos-seletivos")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </div>
  );
}
