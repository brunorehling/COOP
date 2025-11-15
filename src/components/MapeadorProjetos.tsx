// MapProjects.tsx
import { useEffect, useState } from "react";
import { projectsControllerFindAll } from "../api/orval/projects/projects";
import type { Project } from "../utils/projectType";
import { tecnologias } from "./projects/ListaTech";
import { UserInfo } from "./users/cabecalho_user_card";
import { JoinProjectButton } from "./projects/JoinProjectButtom";

// criar lookup rápido: nome da tag (minúsculo) -> src
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

        const data = response.data as unknown as Project[];
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
  }, []);


  if (loading) return <p className="text-white">Carregando projetos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (projects.length === 0) return <p className="text-white">Nenhum projeto encontrado.</p>;

  return (
    <div className="flex flex-col items-center gap-10">
      {projects.map((project) => {
        const isExpanded = expandedProjectId === project.id;

        return (
          <div key={project.id} className="bg-[#3C4860] w-full max-w-[1100px] rounded-[2rem]">
            <div className="flex justify-between items-center p-6">
              <div className="flex flex-warp gap-20 justify-center justify-between items-center">
              <UserInfo owner={project.owner} />
                <div className="flex flex-warp items-center gap-5 mb-5">
                  <img src="./userBranco.png" alt=""/>
                  <h1 className="text-2xl text-white font-jost">{project.membersLimit}</h1>
                </div>
              </div>
              <h4 className="text-white text-2xl font-medium mb-8">{project.name}</h4>
            </div>

           {/* Conteúdo */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
              <img
                src={project.bannerUrl || "./foto_1.png"}
                alt={project.bannerUrl ? `Banner do projeto ${project.name}` : "Imagem curinga do projeto"}
                className="w-full md:w-[15vw] md:h-[20vh] h-auto rounded-xl object-cover"
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
              className={`flex flex-warp justify-between w-full px-6 overflow-hidden transition-all bg-white rounded-b-[2rem] duration-500 ease-in-out ${
                isExpanded ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
              }`}>

              {/* Tecnologias */}
              <div>
                <p className="font-semibold mb-3 text-gray-800">Tecnologias</p>
                <footer className="flex gap-4 pb-3">
                  {project.tags?.slice(0, 5).map((tag) => {
                    const src = techLookup[tag.toLowerCase()];
                    if (!src) return null;
                    return (
                      <div
                        key={tag}
                        className="flex items-center gap-2 border rounded-2xl bg-gray-50 shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                      >
                        <div className="flex items-center mx-2 my-1">
                          <img src={src} alt={tag} className="w-[41px] h-[35px]" />
                          <p className="text-black text-lg ml-2">{tag}</p>
                        </div>
                      </div>
                    );
                  })}

                  {project.tags && project.tags.length > 5 && (
                    <div className="flex items-center justify-center text-gray-700 font-medium px-4 py-2 border rounded-2xl bg-gray-100">
                      +{project.tags.length - 5}
                    </div>
                  )}
                </footer>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
                <JoinProjectButton projectId={project.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
