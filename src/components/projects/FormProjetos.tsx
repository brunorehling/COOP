import { useForm } from "react-hook-form"

export type ProjectFormData = {
  integrantes: number
  nome: string
  descricao: string
  tecnologias: string[]
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void
}

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const { register, handleSubmit } = useForm<ProjectFormData>()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-10 text-white w-full py-10"
    >
      <div className="flex justify-center w-full">
        <img
          src="./foto_1.png"
          alt="Foto Computador"
          className="rounded-xl shadow-lg object-cover w-[30vw] min-w-[320px] max-w-[500px] h-auto"
        />
      </div>

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
            className="bg-white border border-gray-700 w-full rounded-2xl p-2 text-white focus:ring-2 focus:ring-pink-500 outline-none"
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
    </form>
  )
}
