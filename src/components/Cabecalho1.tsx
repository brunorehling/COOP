// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Icon_buscar_1 } from "./IconBuscar1.tsx";

export function Cabecalho1() {
    return(
        <>
            <header className="bg-[#212b41] flex justify-between items-center pr-14 pl-14 pt-7 pb-7 md:pr-32 md:pl-32 md:pt-10 md:pb-14">
                <h1 className="text-white text-5xl md:text-7xl font-semibold font-Sans-serif">CO-OP</h1>
                <div className="flex justify-around items-center gap-10">
                    <Link to="entrar">
                        <Icon_buscar_1 />
                    </Link>
                    <div className="flex justify-around items-center gap-10">
                        <Link to="entrar" className="">
                            <img src="./perfil.png" alt="" className="w-[80px] h-[80px]" />
                        </Link>
                        <Link to="cadastrar" className="">
                            <img src="./notification not selected.png" alt="" className="" />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}