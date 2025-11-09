import { Link } from 'react-router-dom'

export function Navegacao () {
    return (
        <>
            <div className="flex flex-row justify-center gap-16 md:flex md:flex-row md:items-center md:gap-16 md:pt-10 md:pb-4">
                <div className="flex items-center justify-left  md:gap-6">
                    <Link to="/feed">
                        <img src="./home_not_selected.png" alt="pagina inicial" className="" />
                    </Link>
                    <Link to="/feed">
                        <p className="hidden md:flex text-white text-2xl font-normal font-Jost">Página inicial</p>
                    </Link>
                </div>
                <div className="flex items-center justify-left md:gap-6">
                    <Link to="">
                        <img src="./explore_not_selected.png" alt="explorar" className="" />
                    </Link>
                    <Link to="/meusProjetos">
                        <p className="hidden md:flex text-white text-2xl font-normal font-Jost">Meus Projetos</p>
                    </Link>
                </div>
                <div className="flex items-center justify-left md:gap-6">
                    <Link to="">
                        <img src="./message not selected.png" alt="mensagens" className="" />
                    </Link>
                    <Link to="">
                        <p className="hidden md:flex text-white text-2xl font-normal font-Jost">Mensagens</p>
                    </Link>
                </div>
                <div className="flex items-center justify-left md:gap-6">
                    <Link to="/publicar">
                        <img src="./publish not selected.png" alt="publicar" className="" />
                    </Link>
                    <Link to="/publicar">
                        <p className="hidden md:flex text-white text-2xl font-normal font-Jost">Publicar</p>
                    </Link>
                </div>
                <div className="flex items-center justify-left md:gap-6">
                    <Link to="">
                        <img src="./artigo nao selecionado.png" alt="artigos" className="" />
                    </Link>
                    <Link to="">
                        <p className="hidden md:flex text-white text-2xl font-normal font-Jost">Artigos</p>
                    </Link>
                </div>
            </div>
        </>
    )
}