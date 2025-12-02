// MapProjects.tsx
import { useEffect, useState } from "react";
import { projectsControllerFindAll } from "../api/orval/projects/projects";
import type { Project } from "../utils/projectType";
import { tecnologias } from "./projects/ListaTech";
import { UserInfo } from "./users/cabecalho_user_card";
import { JoinProjectButton } from "./projects/JoinProjectButton";

const techLookup = Object.fromEntries(
  tecnologias.map(([src, nome]) => [nome.toLowerCase(), src])
);

const statusMap = {
  IN_PROGRESS: "EM ANDAMENTO",
  TESTING: "FASE DE TESTES",
  FINISHED: "FINALIZADO",
};

export function MapProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  const userId = Number(localStorage.getItem("userId"));

  function toggleAba(projectId: number) {
    setExpandedProjectId(prev => (prev === projectId ? null : projectId));
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await projectsControllerFindAll({
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        let data = response.data as unknown as Project[];
        
        // Processar memberIds incluindo o owner
        data = data.map(project => ({
          ...project,
          memberIds: [
            ...(project.memberIds ?? []).map(Number),
            Number(project.owner?.id)
          ]
        }));

        data = data.filter(project => {
          // Valores com fallback
          const currentMembers = project.currentMembers ?? 0;
          const membersLimit = project.membersLimit ?? 0;
          const memberIds = project.memberIds ?? [];
          const status = project.status || 'IN_PROGRESS';
          
          // Se membersLimit for 0 ou undefined, considera que tem vaga
          const hasVacancy = membersLimit === 0 || currentMembers < membersLimit;
          
          return (
            status !== 'FINISHED' && 
            !memberIds.includes(userId) && 
            hasVacancy
          );
        });
        
        setProjects(data || []);
        setError(null);
      } catch (err: any) {
        console.error("Erro ao buscar projetos:", err);
        setError("Não foi possível carregar os projetos.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  if (loading) return <p className="text-white">Carregando projetos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (projects.length === 0) return <p className="text-white">Nenhum projeto encontrado.</p>;

  return (
    <div className="flex flex-col items-center gap-10">
      {projects.map(project => {
        const isExpanded = expandedProjectId === project.id;

        return (
          <div key={project.id} className="bg-[#3C4860] w-full max-w-[1100px] rounded-[2rem]">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center gap-4">
                <UserInfo owner={project.owner} />
                <div className="flex items-center gap-2">
                  <img src="./userBranco.png" alt="Participantes" className="w-7 h-7" />
                  <span className="text-xl text-white font-jost">{project.membersLimit}</span>
                </div>
              </div>
              <h4 className="text-white text-2xl font-medium">{project.name}</h4>
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
              <img
                src={project.bannerUrl || "./foto_1.png"}
                alt={`Banner do projeto ${project.name}`}
                className="w-full md:w-[20vw] md:h-[25vh] h-auto rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center items-start gap-4 w-full md:w-[600px]">
                <p className="text-white text-lg">{project.description}</p>
              </div>
            </div>

            {/* Footer: status e toggle */}
            <div className="flex justify-between items-center px-6 pb-6">
              <p className="text-white text-lg">{statusMap[project.status]}</p>
              <button
                onClick={() => toggleAba(project.id)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-[#e64eeb] transition"
              >
                {isExpanded ? "Fechar" : "Saiba Mais"}
              </button>
            </div>

            {/* Aba expandida */}
            <div
              className={`w-full px-6 flex justify-between overflow-hidden transition-all bg-white rounded-b-[2rem] duration-500 ease-in-out ${
                isExpanded ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
              }`}
            >
              <div className="flex flex-wrap justify-between">
                <div>
                  <p className="font-semibold mb-3 text-gray-800">Tecnologias</p>
                  <div className="flex flex-wrap gap-4">
                    {project.tags?.slice(0, 5).map(tag => {
                      const src = techLookup[tag.toLowerCase()];
                      if (!src) return null;
                      return (
                        <div key={tag} className="flex items-center gap-2">
                          <img src={src} alt={tag} className="w-[41px] h-[35px]" />
                          <p className="text-black text-lg">{tag}</p>
                        </div>
                      );
                    })}
                    
                    {/* Mostrar indicador "+" se houver mais de 5 tags */}
                    {project.tags && project.tags.length > 5 && (
                      <div className="flex items-center gap-2">
                        <div className="w-[41px] h-[35px] flex items-center justify-center bg-gray-100 rounded">
                          <span className="text-black text-lg font-semibold">+{project.tags.length - 5}</span>
                        </div>
                        <p className="text-black text-lg">mais</p>
                      </div>
                    )}
                  </div>
                </div>
              </div> {/* Fechar a div do flex justify-between */}

              {/* Footer expandido: botão participar */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
                <JoinProjectButton 
                  projectId={project.id} 
                  ownerId={project.owner.id} 
                  projectName={project.name}
                />
              </div>
            </div> {/* Fechar a div da aba expandida */}
          </div> // Fechar a div do projeto
        );
      })}
    </div>
  );
}