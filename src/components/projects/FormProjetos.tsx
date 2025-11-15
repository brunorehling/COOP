import { useForm } from "react-hook-form"
import { useState } from "react"

export type ProjectFormData = {
  nome: string
  descricao: string
  integrantes: number
  status?: "IN_PROGRESS" | "COMPLETED" | "ON_HOLD"
  bannerFile?: FileList
}

interface ProjectFormProps {
  onSubmit: (data: { nome: string; descricao: string; integrantes: number; status?: string; bannerUrl?: string }) => void
}

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const { register, handleSubmit, watch } = useForm<ProjectFormData>()
  const bannerFile = watch("bannerFile")
  const [preview, setPreview] = useState<string | null>(null)

  async function handleFormSubmit(data: ProjectFormData) {
    let bannerUrl: string | undefined

    if (data.bannerFile?.[0]) {
      const file = data.bannerFile[0]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", UPLOAD_PRESET)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      )
      const json = await res.json()
      bannerUrl = json.secure_url
    }

    onSubmit({
      nome: data.nome,
      descricao: data.descricao,
      integrantes: data.integrantes,
      status: data.status,
      bannerUrl,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col justify-center items-center gap-10 text-white w-full py-10">
      
      {/* Upload do Banner */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-bold">Banner do projeto</label>
        <input
          type="file"
          accept="image/*"
          {...register("bannerFile")}
          className="text-white"
          onChange={(e) => {
            if (e.target.files?.[0]) setPreview(URL.createObjectURL(e.target.files[0]))
          }}
        />
        {preview && <img src={preview} className="mt-2 w-[300px] h-auto rounded-lg" />}
      </div>

      {/* Outras informações do projeto */}
      <div className="flex items-center justify-center gap-16 w-[60vw] min-w-[600px] max-w-[900px]">
        <div className="flex flex-warp items-center gap-2 w-[40%]">
          <label className="mb-1 text-sm font-bold">Nº de integrantes</label>
          <input
            type="number"
            {...register("integrantes", { required: true })}
            className="flex items-center bg-[#ffffff] border border-gray-700 w-[20%] rounded-2xl p-2 text-black focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <div className="flex flex-warp items-center w-[40%]">
          <label className="mb-1 text-sm font-bold">Nome do projeto</label>
          <input
            type="text"
            {...register("nome", { required: true })}
            className="bg-white border border-gray-700 w-full rounded-2xl p-2 text-black focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
      </div>

      <div className="w-[60vw] min-w-[600px] max-w-[900px] ml-[6vw]">
        <label className="mb-1 block text-sm">Descrição do projeto</label>
        <textarea
          {...register("descricao", { required: true })}
          className="bg-white border border-gray-700 w-[90%] h-[25vh] p-3 rounded-2xl text-black resize-none focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Descreva o projeto..."
        />
      </div>

      <button type="submit" className="bg-[#E64EEB] px-6 py-3 rounded-xl text-white font-semibold mt-4">
        Salvar Projeto
      </button>
    </form>
  )
}
