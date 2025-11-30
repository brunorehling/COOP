import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./components/projects/FormProjetos";
import type { ProjectFormData } from "./components/projects/FormProjetos";
import SelecionarTech from "./components/projects/SelecionarTech";
import { Cabecalho2 } from "./components/Cabecalho2";
import { Navegacao } from "./components/Navegacao";
import api from "./api/api"; 
export function CriarProjetos() {
  const [error, setError] = useState("")
  const [tecnologias, setTecnologias] = useState<string[]>([])
  const navigate = useNavigate()

  async function handleCreateProject(data: ProjectFormData) {
    const membersLimit = Number(data.integrantes)

    if (membersLimit < 1 || membersLimit > 50) {
      setError("O número de integrantes deve ser entre 1 e 50.")
      return
    }

    try {
      await api.post("/projects", {
        name: data.nome,
        description: data.descricao,
        membersLimit,
        status: data.status || "IN_PROGRESS",
        bannerUrl: data.bannerUrl,
        tags: tecnologias,
      })

      navigate("/feed")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar projeto")
    }
  }

  return (
    <main className=" min-h-screen">
      <Cabecalho2 />
      <Navegacao />

      <div className="flex flex-col items-center m-20 gap-10">
        <ProjectForm onSubmit={handleCreateProject} />

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white text-4xl">Habilidades Técnicas</h1>
          <SelecionarTech onChange={setTecnologias} />
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/feed")}
            className="bg-black text-white px-6 py-2 rounded-full cursor-pointer"
          >
            Descartar Projeto
          </button>

          <button
            type="submit"
            form="project-form"
            className="bg-pink-500 text-white px-6 py-2 rounded-full cursor-pointer"
          >
            Publicar Projeto
          </button>
        </div>
      </div>
    </main>
  )
}
