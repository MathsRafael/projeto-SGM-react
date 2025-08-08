import { useAuth } from "../AuthContext";
import NavItem from "../navbar/NavItem.jsx";
import ScrollContainer from "../navbar/ScrollContainer.jsx";
function NavBar() {
  const { profiles } = useAuth();

  return (
    <nav>
      <ScrollContainer>
        {profiles.includes("professor") && (
          <>
            <NavItem to="/professor" label="Painel Professor" />
            <NavItem
              to="/professor/minhas-monitorias"
              label="Minhas Monitorias"
            />
            <NavItem to="/editais" label="Editais" />
          </>
        )}

        {profiles.includes("aluno") && (
          <>
            <NavItem to="/editais" label="Editais" />
            <NavItem to="/minhas-inscricoes" label="Minhas Inscrições" />
          </>
        )}

        {profiles.includes("admin") && (
          <>
            <NavItem to="/instituicoes" label="Instituições" />
            <NavItem to="/professores/coordenadores" label="Coordenadores" />
            <NavItem to="/alunos" label="Alunos" />
            <NavItem to="/disciplinas" label="Disciplinas" />
            <NavItem to="/cursos" label="Cursos" />
            <NavItem to="/professores" label="Professores" />
          </>
        )}

        {profiles.includes("coordenador") && (
          <>
            <NavItem to="/alunos" label="Alunos" />
            <NavItem to="/disciplinas" label="Disciplinas" />
            <NavItem to="/monitorias" label="Gerenciar Monitorias" />
            <NavItem to="/processos-seletivos" label="Gerenciar Editais" />
          </>
        )}
      </ScrollContainer>
    </nav>
  );
}

export default NavBar;
