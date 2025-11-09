import { useEffect, useState } from "react";
import { projectsControllerFindAll } from "../../api/orval/projects/projects";
import { authControllerGetProfile } from "../../api/orval/auth/auth";
import type { Project } from "../../utils/projectType";
import type { User } from "../../utils/UserType";
import { tecnologias } from "../projects/ListaTech";
import { UserInfo } from "../users/cabecalho_user_card";

const techLookup = Object.fromEntries(
  tecnologias.map(([src, nome]) => [nome.toLowerCase(), src])
);

export function MapProjectsUser() {
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
        if (!token) throw new Error("Token não encontrado.");

        // busca o perfil do usuário logado
        const profileResponse = await authControllerGetProfile({
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("PROFILE RESPONSE:", profileResponse);

        // pega o userId corretamente
        const userId = (profileResponse.data as any).userId;
        console.log("LOGGED USER ID:", userId);

        // busca todos os projetos
        const projectsResponse = await projectsControllerFindAll({
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("PROJECTS RESPONSE:", projectsResponse);

        const data = projectsResponse.data as unknown as Project[];

        // filtra só os projetos do usuário logado
        const userProjects = data.filter(
          (project) => String(project.owner?.id) === String(userId)
        );

        setProjects(userProjects);
        setError(null);
      } catch (err) {
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
              <div className="flex flex-wrap gap-20 justify-center items-center">
                <UserInfo owner={project.owner} />
                <div className="flex flex-wrap gap-5">
                  <img src="./userBranco.png" alt="" />
                  <h1 className="text-2xl text-white font-jost">{project.membersLimit}</h1>
                </div>
              </div>
              <h4 className="text-white text-2xl font-medium">{project.name}</h4>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
              <img
                src={project.bannerUrl || "./foto_1.png"}
                alt="Foto Computador"
                className="w-[370px] h-[250px] object-cover"
              />
              <div className="flex flex-col justify-center items-start gap-4 w-full md:w-[600px]">
                <p className="text-white text-lg">{project.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center px-6 pb-6">
              <p className="text-white text-lg">{project.status}</p>
              <button
                onClick={() => toggleAba(project.id)}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-[#e64eeb] transition"
              >
                {isExpanded ? "Fechar" : "Saiba Mais"}
              </button>
            </div>

            <div
              className={`w-full px-6 overflow-hidden transition-all bg-white rounded-b-[2rem] duration-500 ease-in-out ${
                isExpanded ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
              }`}
            >
              <div>
                <p className="font-semibold mb-3 text-gray-800">Tecnologias</p>
                <div className="flex flex-wrap gap-4">
                  {project.tags?.map((tag) => {
                    const src = techLookup[tag.toLowerCase()];
                    if (!src) return null;
                    return (
                      <div key={tag} className="flex items-center gap-2">
                        <img src={src} alt={tag} className="w-[41px] h-[35px]" />
                        <p className="text-black text-lg">{tag}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
                <button className="bg-[#e64eeb] text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition">
                  Participar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
