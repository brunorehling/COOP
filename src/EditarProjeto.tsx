// pages/EditarProjeto.tsx
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProjectForm from "./components/projects/FormProjetos"
import type { ProjectFormData } from "./components/projects/FormProjetos"
import SelecionarTech from "./components/projects/SelecionarTech"
import { Cabecalho2 } from "./components/Cabecalho2"
import { Navegacao } from "./components/Navegacao"
import api from "./api/api"

export default function EditarProjeto() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [tecnologias, setTecnologias] = useState<string[]>([])
  const [defaultValues, setDefaultValues] = useState<ProjectFormData | null>(null)

  // Carregar projeto existente
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await api.get(`/projects/${id}`)
        const data = res.data

        setDefaultValues({
          nome: data.name,
          descricao: data.description,
          integrantes: data.membersLimit,
          status: data.status,
          bannerUrl: data.bannerUrl,
        })

        setTecnologias(data.tags || [])
      } catch (err) {
        setError("Não foi possível carregar o projeto.")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  async function handleUpdateProject(data: ProjectFormData) {
    try {
      await api.patch(`/projects/${id}`, {
        name: data.nome,
        description: data.descricao,
        membersLimit: Number(data.integrantes),
        bannerUrl: data.bannerUrl,
        status: data.status,
        tags: tecnologias,
      })

      navigate("/feed")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao salvar projeto.")
    }
  }
  async function handleFinishProject() {
  if (!confirm("Tem certeza que deseja finalizar este projeto? Esta ação não pode ser desfeita.")) return;
  
  try {
    await api.patch(`/projects/${id}`, {
      status: "FINISHED"
    });
    
    alert("✅ Projeto finalizado com sucesso!");
    navigate("/feed");
  } catch (err: any) {
    setError(err.response?.data?.message || "Erro ao finalizar projeto.");
  }
}

  if (loading) return <p className="text-white">Carregando...</p>

  return (
    <main className="bg-[#212B41] min-h-screen">
      <Cabecalho2 />
      <Navegacao />

      <div className="flex flex-col items-center m-20 gap-10">
        <h1 className="text-white text-4xl">Editar Projeto</h1>

        {defaultValues && (
          <ProjectForm defaultValues={defaultValues} onSubmit={handleUpdateProject} />
        )}

        {/* Tecnologias */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white text-3xl">Habilidades Técnicas</h1>
          <SelecionarTech onChange={setTecnologias} defaultValues={tecnologias} />
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <div className="flex gap-4 mt-6">

          <button
            type="submit"
            form="project-form"
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:opacity-80 transition"> Salvar Alterações</button>

           <button
              onClick={handleFinishProject}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
               Finalizar Projeto
            </button>

          <button
            onClick={async () => {
              if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

              try {
                await api.delete(`/projects/${id}`);
                navigate("/feed");
              } catch (err: any) {
                setError(err.response?.data?.message || "Erro ao deletar projeto.");
              }
            }}
            className="bg-black text-white px-6 py-2 rounded-full hover:opacity-80 transition"
          >
            Deletar Projeto
          </button>
        </div>

      </div>
    </main>
  )
}
