import { InfoUserPages } from "./InfoUserPages"


function CardFeedPadrao() {
    return (
        <>
        <main className="bg-cinza w-[1100px] h-[440px] rounded-[10px] mb-10">
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
                <div className="flex justify-end items-center pr-12">
                    <button className="w-[170px] h-[34px] rounded-[25px] bg-black">
                        <p className="text-white text-lg font-normal font-Jost ">Saiba Mais</p>
                    </button>
                </div>
            </div>
        </main> 
        </>
    )
}

export default CardFeedPadrao
