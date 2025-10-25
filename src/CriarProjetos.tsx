import { useForm } from "react-hook-form";
import { Cabecalho2 } from "./components/Cabecalho2";
import { Navegacao } from "./components/Navegacao";
import { useNavigate } from "react-router-dom";

import { getProjects } from "./api/orval/projects/projects";
import { useState } from "react";


type ProjectData = {
    integrantes: number
    nome: string
    descricao: string

  }

  const myApi = getProjects()

export function CriarProjetos() {
    const { register, handleSubmit } = useForm<ProjectData>()
      const navigate = useNavigate()
      const [error, setError] = useState('')

    const onSubmit = handleSubmit(async (data) => {
        try {
          const res = await myApi.projectsControllerCreate({ name: data.nome, description: data.descricao })
          console.log('Usuário logado:', res.data)
          navigate('/feed')
        } catch (err: any) {
          setError(err.response?.data?.message || 'Erro ao criar projeto')
        }
      })

    return(
        <>
            <main className="bg-[#212b41]">
                <Cabecalho2 />
                <Navegacao />
                <div className="flex flex-col justify-center items-center m-20">
                    <div className="flex flex-col justify-center items-center ">
                        <img src="./foto_1.png" alt="Foto Computador" className="w-[370px] h-[250px] "/>
                        <form  className="flex flex-col justify-center items-center m-20" onSubmit={(e) => {e.preventDefault() 
                        onSubmit()} }>
                        <div className="flex flex-warp items-center justify between m-10 ">   
                            <div className="flex flex-warp mx-10 items-center">
                                <label className="text-white">N de integrantes</label>
                                <input type="number" {...register('integrantes', { required: true })} className=" bg-white border w-16 p-2 rounded-2xl " />
                            </div>
                            <div className="flex flex-warp mx-10 items-center">
                                <label className="text-white">Nome do projeto</label>
                                <input type="string" {...register('nome', { required: true })} className=" bg-white border p-2 rounded-2xl"  />
                            </div>
                        </div>
                        <input type="text" {...register('descricao', { required: true })} className=" bg-white border w-[600px] h-[400px] p-2 rounded-2xl " />
                        </form>
                    </div>
                    <h1 className="text-white text-4xl">Habilidades Técnicas</h1>
                    </div>              
            </main>
        </>
    )

}
