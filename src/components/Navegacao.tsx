import { Link, useLocation } from 'react-router-dom'

export function Navegacao() {
  const location = useLocation()

  return (
    <div className="flex flex-row justify-center gap-16 md:flex md:flex-row md:items-center md:gap-16 md:pt-10 md:pb-4">
      {/* Página inicial */}
      <div className="flex items-center justify-left md:gap-6">
        <Link to="/feed">
          <img
            src={
              location.pathname === '/feed'
                ? '/home_selected.webp'
                : '/home_not_selected.webp'
            }
            alt="Página inicial"
          />
        </Link>
        <Link to="/feed">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/feed' ? 'text-white underline decoration-[#e64eeb] decoration-2' : 'text-white'
            }`}
          >
            Página inicial
          </p>
        </Link>
      </div>

      {/* Meus Projetos */}
      <div className="flex items-center justify-left md:gap-6">
        <Link to="/meus_projetos">
          <img
            src={
              location.pathname === '/meus_projetos'
                ? '/explore_selected.webp'
                : '/explore_not_selected.webp'
            }
            alt="Meus Projetos"
          />
        </Link>
        <Link to="/meus_projetos">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/meus_projetos'
                ?  'text-white underline decoration-[#e64eeb] decoration-2' 
                : 'text-white'
            }`}
          >
            Meus Projetos
          </p>
        </Link>
      </div>

      {/* Mensagens */}
      <div className="flex items-center justify-left md:gap-6">
        <Link to="">
          <img
            src={
              location.pathname === '/mensagens'
                ? '/message_selected.png'
                : '/message not selected.png'
            }
            alt="Mensagens"
          />
        </Link>
        <Link to="">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/mensagens' ?  'text-white underline decoration-[#e64eeb] decoration-2'  : 'text-white'
            }`}
          >
            Mensagens
          </p>
        </Link>
      </div>

      {/* Publicar */}
      <div className="flex items-center justify-left md:gap-6">
        <Link to="/publicar">
          <img
            src={
              location.pathname === '/publicar'
                ? '/publish_selected.webp'
                : '/publish_not_selected.webp'
            }
            alt="Publicar"
          />
        </Link>
        <Link to="/publicar">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/publicar' ? 'text-white underline decoration-[#e64eeb] decoration-2' : 'text-white'
            }`}
          >
            Publicar
          </p>
        </Link>
      </div>
    </div>
  )
}
