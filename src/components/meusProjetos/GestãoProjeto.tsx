import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectsControllerFindOne } from "../../api/orval/projects/projects";
import type { Project } from "../../utils/projectType";
import { Cabecalho2 } from "../Cabecalho2";
import { NavProject } from "./NavProjeto";
import { VisaoGeralProjeto } from "./abas/VisaoGeral";

export function GestaoProjeto() {
  const { id } = useParams<{ id?: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("visaoGeral");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token não encontrado.");
        if (!id) throw new Error("ID do projeto não encontrado.");

        const response = await projectsControllerFindOne(id, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProject(response.data as unknown as Project);
      } catch (err) {
        console.error("Erro ao buscar projeto:", err);
        setError("Não foi possível carregar o projeto.");
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p className="text-white text-center py-10">Carregando projeto...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!project) return <p className="text-white text-center py-10">Projeto não encontrado.</p>;

  return (
    <>
      <Cabecalho2 />

      <NavProject activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-10">
        {activeTab === "visaoGeral" && project && <VisaoGeralProjeto project={project} />}
        {activeTab === "tarefas" && <p className="text-white">Tarefas do projeto...</p>}
        {activeTab === "equipe" && <p className="text-white">Equipe do projeto...</p>}
        {activeTab === "config" && <p className="text-white">Configurações do projeto...</p>}
      </div>
    </>
  );
}
