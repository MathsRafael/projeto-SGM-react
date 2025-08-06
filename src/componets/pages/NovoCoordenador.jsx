import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as coordenadorService from "../services/coordenadorService";
import Button from "../form/Button.jsx";

export default function NovoCoordenador() {
  const navigate = useNavigate();
  const [professorId, setProfessorId] = useState("");
  const [cursoId, setCursoId] = useState("");

  const [professores, setProfessores] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    Promise.all([
      coordenadorService.getProfessores(),
      coordenadorService.getCursos(),
    ])
      .then(([profResponse, cursoResponse]) => {
        setProfessores(profResponse.data);
        setCursos(cursoResponse.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados", err);
        setErro("Não foi possível carregar professores e cursos.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!professorId || !cursoId) {
      setErro("Por favor, selecione um professor e um curso.");
      return;
    }
    coordenadorService
      .promoteProfessor(professorId, cursoId)
      .then(() => navigate("/professores/coordenadores"))
      .catch((error) => {
        console.error("Erro ao promover professor:", error);
        setErro(error.response?.data?.message || "Erro ao salvar.");
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">
          Promover Professor a Coordenador
        </h2>
        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Professor</label>
          <select
            value={professorId}
            onChange={(e) => setProfessorId(e.target.value)}
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

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Curso a Coordenar</label>
          <select
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            className="mt-0.5 mb-3 p-[8px] border-2 border-[#ccc] w-full"
            required
          >
            <option value="">Selecione um curso</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            type="button"
            color="color"
            onClick={() => navigate("/professores/coordenadores")}
          >
            Cancelar
          </Button>
          <Button type="submit">Promover</Button>
        </div>
      </form>
    </div>
  );
}
