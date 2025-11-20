// components/projects/ProjectForm.tsx
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

export type ProjectFormData = {
  nome: string
  descricao: string
  integrantes: number
  status?: "IN_PROGRESS" | "COMPLETED" | "ON_HOLD"
  bannerUrl?: string
  bannerFile?: FileList
}

interface ProjectFormProps {
  defaultValues?: ProjectFormData
  onSubmit: (data: ProjectFormData) => void
}

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET

export default function ProjectForm({ defaultValues, onSubmit }: ProjectFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ProjectFormData>({
    defaultValues: defaultValues || {},
  })

  const [preview, setPreview] = useState<string | null>(defaultValues?.bannerUrl || null)
  const bannerFile = watch("bannerFile")

  // Preencher valores quando edição carregar
  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as any, value)
      })
      setPreview(defaultValues.bannerUrl || null)
    }
  }, [defaultValues])

  async function handleFormSubmit(data: ProjectFormData) {
    let bannerUrl = defaultValues?.bannerUrl

    // Upload caso usuário troque o banner
    if (data.bannerFile?.[0]) {
      const file = data.bannerFile[0]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", UPLOAD_PRESET)

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      })

      const json = await res.json()
      bannerUrl = json.secure_url
    }

    onSubmit({
      ...data,
      bannerUrl,
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col justify-center items-center gap-10 text-white w-full py-10"
      id="project-form"
    >
      {/* Banner */}
      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-bold">Banner do projeto</label>
        <input
          type="file"
          accept="image/*"
          {...register("bannerFile")}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setPreview(URL.createObjectURL(e.target.files[0]))
            }
          }}
          className="flex bg-[#e64eeb] p-3 rounded-2xl text-white justify-center" 
        />

        {preview && <img src={preview} className="mt-2 w-[300px] rounded-lg" />}
      </div>

      {/* Inputs principais */}
      <div className="flex items-center justify-center gap-16 w-[60vw] min-w-[600px] max-w-[900px]">
        <div className="flex flex-col gap-2 w-[40%]">
          <label className="text-sm font-bold">Nº de integrantes</label>
          <input
            type="number"
            {...register("integrantes", { required: true })}
            className="bg-white border border-gray-700 w-[40%] rounded-2xl p-2 text-black"
          />
        </div>

        <div className="flex flex-col gap-2 w-[40%]">
          <label className="text-sm font-bold">Nome do projeto</label>
          <input
            type="text"
            {...register("nome", { required: true })}
            className="bg-white border border-gray-700 w-full rounded-2xl p-2 text-black"
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="w-[60vw] min-w-[600px] max-w-[900px] ml-[6vw]">
        <label className="text-sm mb-1 block font-bold">Descrição do projeto</label>
        <textarea
          {...register("descricao", { required: true })}
          className="bg-white border border-gray-700 w-[90%] h-[25vh] p-3 rounded-2xl text-black resize-none"
          placeholder="Descreva o projeto..."
        />
      </div>
    </form>
  )
}
