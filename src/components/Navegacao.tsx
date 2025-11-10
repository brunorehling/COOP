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
                ? './home_selected.png'
                : './home_not_selected.png'
            }
            alt="Página inicial"
          />
        </Link>
        <Link to="/feed">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/feed' ? 'text-[#e64eeb]' : 'text-white'
            }`}
          >
            Página inicial
          </p>
        </Link>
      </div>

      {/* Meus Projetos */}
      <div className="flex items-center justify-left md:gap-6">
        <Link to="/meusProjetos">
          <img
            src={
              location.pathname === '/meusProjetos'
                ? './explore_selected.png'
                : './explore_not_selected.png'
            }
            alt="Meus Projetos"
          />
        </Link>
        <Link to="/meusProjetos">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/meusProjetos'
                ? 'text-[#e64eeb]'
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
                ? './message_selected.png'
                : './message not selected.png'
            }
            alt="Mensagens"
          />
        </Link>
        <Link to="">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/mensagens' ? 'text-[#e64eeb]' : 'text-white'
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
                ? './publish_selected.png'
                : './publish not selected.png'
            }
            alt="Publicar"
          />
        </Link>
        <Link to="/publicar">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/publicar' ? 'text-[#e64eeb]' : 'text-white'
            }`}
          >
            Publicar
          </p>
        </Link>
      </div>

      {/* Artigos */}
      <div className="flex items-center justify-left md:gap-6">
        <Link to="">
          <img
            src={
              location.pathname === '/artigos'
                ? './artigo selecionado.png'
                : './artigo nao selecionado.png'
            }
            alt="Artigos"
          />
        </Link>
        <Link to="">
          <p
            className={`hidden md:flex text-2xl font-normal font-Jost ${
              location.pathname === '/artigos' ? 'text-[#e64eeb]' : 'text-white'
            }`}
          >
            Artigos
          </p>
        </Link>
      </div>
    </div>
  )
}
