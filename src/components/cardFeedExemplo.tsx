import { InfoUserPages } from "./InfoUserPages"
import { useState } from "react";


function CardFeedExemplo() {

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
            <div className="flex justify-center flex-col items-center w-full">
                    <button onClick={toggleAba} className="bg-black text-white text-lg font-normal font-Jost px-4 py-2 rounded-lg hover:bg-[#e64eeb] transition">
                        {mostrarAba ? "Fechar" : "Saiba Mais"}
                    </button>

                    <div className={`w-[1100px] h-[200px] flex flex-col justify-center items-start rounded-[10px] bg-white shadow-md mt-4 overflow-hidden transition-all duration-500 ease-in-out ${mostrarAba ? "max-h-[600px] opacity-100 p-6" : "max-h-0 opacity-0 p-0"}`}>
                        <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">Necessito de um dev front end para o meu projeto</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Busco alguém para cuidar do front-end, ajudando a dar vida às telas e criando uma interface moderna e funcional junto comigo.
                        </p>
                        <div className="flex flex-row justify-between items-center w-[1000px]">
                            <div className="flex flex-col justify-center items-start gap-3 pt-6">
                                <p className="font-semibold mb-3 text-center text-gray-800">Tecnologias necessárias</p>
                                <div className="flex flex-row itens-center justify-center gap-6">
                                    <div className="flex flex-row justify-center items-center gap-2">
                                        <img src="./react.png" alt="" className="w-[41px] h-[35px]" />
                                        <p className="text-gray-700 leading-relaxed text-lg">react js</p>
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-2">
                                        <img src="./tailwind.png" alt="" className="w-[41px] h-[35px]" />
                                        <p className="text-gray-700 leading-relaxed text-lg">tailwind</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-3">
                                <p className="text-gray-700 text-base md:text-lg font-semibold font-Jost">Colaborativo</p>
                                <button className="w-[35px] h-[32px] flex items-center justify-center md:justify-between pl-6 md:w-[130px] md:h-[34px] bg-[#e64eeb] rounded-[21px] text-center text-white text-base md:text-lg font-semibold font-Jost">Participar</button>
                            </div>
                        </div>
                    </div>
            </div>
        </main> 
        </>
    )
}

export default CardFeedExemplo
