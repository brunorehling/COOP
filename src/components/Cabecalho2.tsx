import { Link } from 'react-router-dom'
import { Icon_buscar_1 } from "./IconBuscar1.tsx";

export function Cabecalho2() {
    return(
        <>
            <header className="bg-[#212b41] flex justify-between items-center pr-14 pl-14 pt-7 pb-7 md:pr-32 md:pl-32 md:pt-10 md:pb-14">
                <h1 className="text-white text-5xl md:text-7xl font-semibold font-Sans-serif ">CO-OP</h1>
                <div className="flex justify-around items-center gap-10">
                    <div className="flex justify-around items-center gap-4">
                        <Link to="/login" className="">
                            <p className="text-white text-2xl font-normal font-Jost flex justify-center items-center">Entrar</p>
                        </Link>
                        <Link to="/cadastro" className="">
                            <p className="w-[155px] h-9 bg-[#e64eeb] rounded-[21px] text-white text-2xl font-normal font-Jost flex justify-center items-center">Cadastrar</p>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}