import { useEffect, useState } from "react";
import { InfoUserPages } from "./InfoUserPages";
import { getProjects } from "../api/orval/projects/projects";
import type { AxiosResponse } from "axios";
import type { Project } from "../utils/projectType";

// URL base da API caso não use proxy local
const API_URL = import.meta.env.VITE_API_URL || "https://projeto-api-7h8d.onrender.com";

export function CardFeedPadrao() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { projectsControllerFindAll } = getProjects();
        const token = localStorage.getItem("token");

        const response = await projectsControllerFindAll<AxiosResponse<Project[]>>({
          baseURL: API_URL, // garante que vai pra API real
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        // Se a API devolver { data: [...] } use response.data.data
        // Se devolver direto o array, use response.data
        const data = Array.isArray(response.data) ? response.data : response.data;

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

  if (loading) {
    return <p className="text-white">Carregando projetos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (projects.length === 0) {
    return <p className="text-white">Nenhum projeto encontrado.</p>;
  }

  return (
    <>
      {projects.map((project) => (
        <main
          key={project.id}
          className="bg-[#3C4860] w-[1100px] h-[440px] rounded-[10px] mb-10"
        >
          <div>
            <div className="flex justify-between items-center p-6 md:p-2">
              <div><InfoUserPages /></div>
              <div className="flex justify-center items-center w-[300px] gap-4">
                <h4 className="text-white text-base md:text-2xl font-medium font-Jost">
                  {project.name}
                </h4>
              </div>
            </div>
            <div className="flex justify-center items-center gap-20 p-6 md:p-4">
              <div>
                <img
                  src="./foto_1.png"
                  alt="Foto Computador"
                  className="w-[370px] h-[250px]"
                />
              </div>
              <div className="w-[600px] flex flex-col justify-center items-start gap-4">
                <p className="text-white text-base md:text-lg font-normal font-Jost">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="flex justify-end items-center pr-12 gap-4">
              <p className="text-white text-lg font-normal font-Jost">{project.status}</p>
              <button className="w-[170px] h-[34px] rounded-[25px] bg-black">
                <p className="text-white text-lg font-normal font-Jost">Saiba Mais</p>
              </button>
            </div>
          </div>
        </main>
      ))}
    </>
  );
}
