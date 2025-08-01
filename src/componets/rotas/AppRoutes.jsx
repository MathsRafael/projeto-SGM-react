import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Aluno from "../pages/Aluno";
import Professor from "../pages/Professor";
import Coordenador from "../pages/Coordenador";
import Monitor from "../pages/Monitor";
import Admin from "../pages/Admin";
import CadastrarAluno from "../pages/CadastroAluno";
import SenhaEsquecida from "../pages/SenhaEsquecida";
import RotaProtegida from "./RotaProtegida";
import Cabeca from "../layout/Conteiner";
import Perfil from "../pages/Perfil";
import Editais from "../pages/Editais";
import Monitorias from "../pages/Monitorias";
import Alunos from "../pages/Alunos";
import Instituicoes from "../pages/Instituicoes";
import NovaInstituicao from "../pages/NovaInstituicao";
import EditarInstituicao from "../pages/EditarInstituicao";
import Disciplinas from "../pages/Disciplinas";
import NovaDisciplina from "../pages/NovaDisciplina";
import EditarDisciplina from "../pages/EditarDisciplina";

import Coordenadores from "../pages/Coordenadores.jsx";
import NovoCoordenador from "../pages/NovoCoordenador.jsx";
import EditarCoordenador from "../pages/EditarCoordenador.jsx";
import Cursos from "../pages/Cursos.jsx";
import NovoCurso from "../pages/NovoCurso.jsx";
import EditarCurso from "../pages/EditarCurso.jsx";

function AppRoutes() {
  const location = useLocation();

  const rotasSemNav = ["/", "/senhaEsquecida", "/cadastrarAluno"];
  const mostrarCon = !rotasSemNav.includes(location.pathname);

  return (
    <>
      {mostrarCon && <Cabeca />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/senhaEsquecida" element={<SenhaEsquecida />} />

        <Route
          path="/coordenadores"
          element={
            <RotaProtegida perfilPermitido="admin">
              <Coordenadores />
            </RotaProtegida>
          }
        />
        <Route
          path="/coordenadores/novo"
          element={
            <RotaProtegida perfilPermitido="admin">
              <NovoCoordenador />
            </RotaProtegida>
          }
        />
        {}
        <Route
          path="/coordenadores/editar/:id"
          element={
            <RotaProtegida perfilPermitido="admin">
              <EditarCoordenador />
            </RotaProtegida>
          }
        />

        <Route
          path="/aluno/:id"
          element={
            <RotaProtegida
              perfilPermitido={[
                "professor",
                "coordenador",
                "aluno",
                "monitor",
                "admin",
              ]}
            >
              <Aluno />
            </RotaProtegida>
          }
        />

        <Route
          path="/perfil/:id"
          element={
            <RotaProtegida
              perfilPermitido={[
                "professor",
                "coordenador",
                "aluno",
                "monitor",
                "admin",
              ]}
            >
              <Perfil />
            </RotaProtegida>
          }
        />

        <Route
          path="/editais"
          element={
            <RotaProtegida
              perfilPermitido={[
                "professor",
                "coordenador",
                "aluno",
                "monitor",
                "admin",
              ]}
            >
              <Editais />
            </RotaProtegida>
          }
        />

        <Route
          path="/monitorias"
          element={
            <RotaProtegida
              perfilPermitido={[
                "professor",
                "coordenador",
                "aluno",
                "monitor",
                "admin",
              ]}
            >
              <Monitorias />
            </RotaProtegida>
          }
        />

        <Route
          path="/alunos"
          element={
            <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
              <Alunos />
            </RotaProtegida>
          }
        />

        <Route
          path="/professor"
          element={
            <RotaProtegida perfilPermitido={["professor", "coordenador"]}>
              <Professor />
            </RotaProtegida>
          }
        />

        <Route path="/cadastrarAluno" element={<CadastrarAluno />} />

        <Route
          path="/coordenador"
          element={
            <RotaProtegida perfilPermitido="coordenador">
              <Coordenador />
            </RotaProtegida>
          }
        />

        <Route
          path="/monitor"
          element={
            <RotaProtegida perfilPermitido="monitor">
              <Monitor />
            </RotaProtegida>
          }
        />

        <Route
          path="/admin"
          element={
            <RotaProtegida perfilPermitido="admin">
              <Admin />
            </RotaProtegida>
          }
        />

        {}
        <Route
          path="/coordenadores"
          element={
            <RotaProtegida perfilPermitido="admin">
              <Coordenadores />
            </RotaProtegida>
          }
        />
        <Route
          path="/coordenadores/novo"
          element={
            <RotaProtegida perfilPermitido="admin">
              <NovoCoordenador />
            </RotaProtegida>
          }
        />

        {}
        <Route
          path="/instituicoes"
          element={
            <RotaProtegida perfilPermitido="admin">
              <Instituicoes />
            </RotaProtegida>
          }
        />
        <Route
          path="/instituicoes/novo"
          element={
            <RotaProtegida perfilPermitido="admin">
              <NovaInstituicao />
            </RotaProtegida>
          }
        />
        <Route
          path="/instituicoes/:id"
          element={
            <RotaProtegida perfilPermitido="admin">
              <EditarInstituicao />
            </RotaProtegida>
          }
        />

        <Route
          path="/disciplinas"
          element={
            <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
              <Disciplinas />
            </RotaProtegida>
          }
        />
        <Route
          path="/disciplinas/novo"
          element={
            <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
              <NovaDisciplina />
            </RotaProtegida>
          }
        />
        <Route
          path="/disciplinas/:id"
          element={
            <RotaProtegida perfilPermitido={["coordenador", "admin"]}>
              <EditarDisciplina />
            </RotaProtegida>
          }
        />
        <Route
          path="/cursos"
          element={
            <RotaProtegida perfilPermitido="admin">
              <Cursos />
            </RotaProtegida>
          }
        />
        <Route
          path="/cursos/novo"
          element={
            <RotaProtegida perfilPermitido="admin">
              <NovoCurso />
            </RotaProtegida>
          }
        />
        <Route
          path="/cursos/editar/:id"
          element={
            <RotaProtegida perfilPermitido="admin">
              <EditarCurso />
            </RotaProtegida>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
