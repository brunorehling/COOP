import { InfoUserPages } from "./InfoUserPages"
import { useState } from "react";


function projetoAba() {

    const [mostrarAba, setMostrarAba] = useState(false);

    const toggleAba = () => {
        setMostrarAba(!mostrarAba);
    };

    return (
        <>
        <main className="bg-[#3C4860] w-[1100px] h-auto rounded-[10px] mb-10">
            <div className="">
                <div className="flex justify-between items-center p-6 md:p-2">
                    <div className=""><InfoUserPages /></div>
                    <div className="flex justify-center items-center w-[300px] gap-4">
                        <h4 className="text-white text-base md:text-2xl font-medium font-Jost">CodeX</h4>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-20 p-6 md:p-4">
                    <div className="">
                        <img src="./foto_1.png" alt="Foto Computador" className="w-[370px] h-[250px]" />
                    </div>
                    <div className="w-[600px] flex flex-col justify-center items-start gap-4">
                        <p className="text-white text-base md:text-lg font-normal font-Jost">Olá, pessoal! Estou iniciando um projeto e procuro pessoas
                            interessadas em colaborar. A ideia é formar uma equipe unida,
                            onde cada um possa contribuir com suas habilidades e também
                            aprender no processo.
                            Se você tem interesse em desenvolvimento, design ou qualquer 
                            outra área que possa agregar, me chama! 

                            Vamos construir algo juntos. 🚀</p>
                    </div>
                </div>  
            </div>
        </main> 
        </>
    )
}

export default projetoAba
