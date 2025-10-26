import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProjects } from "./api/orval/projects/projects"
import { Cabecalho2 } from "./components/Cabecalho2"
import { Navegacao } from "./components/Navegacao"
import ProjectForm from "./components/projects/FormProjetos"
import SelecionarTech from "./components/projects/SelecionarTech"

export function CriarProjetos() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const myApi = getProjects()

  async function handleCreateProject(data: {
    nome: string
    descricao: string
    integrantes: number
    tecnologias: string[]
  }) {
    try {
      await myApi.projectsControllerCreate({
        name: data.nome,
        description: data.descricao,
        techs: data.tecnologias,
      })
      navigate("/feed")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar projeto")
    }
  }

  return (
    <main className="bg-[#212b41] min-h-screen">
      <Cabecalho2 />
      <Navegacao />
      <div className="flex flex-col items-center m-20 gap-10">
        <ProjectForm onSubmit={handleCreateProject} />
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white text-4xl">Habilidades Técnicas</h1>
          <SelecionarTech />
        </div>
        {error && <p className="text-red-400">{error}</p>}
      </div>
    </main>
  )
}
