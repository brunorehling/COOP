import { Link } from 'react-router-dom'
import { Cabecalho1 } from "./components/Cabecalho1.tsx"
import { Footer } from './components/Footer.tsx'

function Land() {
  return (
    <>
      <Cabecalho1 />

      {/* Hero Section */}
      <section className="bg-[#212b41] flex flex-col-reverse md:flex-row md:justify-between items-center gap-10 md:gap-14 px-6 md:px-28 pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="md:w-[600px] flex flex-col gap-4">
          <h2 className="text-white text-[28px] md:text-[60px] font-semibold font-Jost leading-tight md:leading-tight">
            COOPERE, CONHEÇA E COLABORE COM PESSOAS EM SEUS PROJETOS.
          </h2>
          <p className="text-white/60 text-[18px] md:text-[24px] font-normal font-Jost leading-relaxed md:leading-relaxed">
            Buscamos impulsionar e criar um ecossistema rico para desenvolvedores e idealizadores. Venha bater papo, curtir e colaborar!
          </p>
          <div className="pt-6">
            <Link to="/feed" className="flex justify-center items-center w-[220px] h-[43px] bg-[#e64eeb] rounded-[21px] text-white text-base md:text-2xl font-normal font-Jost">
              Let's CO-OP!
            </Link>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img src="./image1.png" alt="" className="w-[300px] h-[270px] md:w-[547px] md:h-[530px] object-contain" />
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row md:justify-between bg-white items-center gap-10 md:gap-14 px-6 md:px-28 pt-16 md:pt-20 pb-20 md:pb-28">
        {/* Desktop image */}
        <div className="hidden md:block md:w-[468px] md:h-[462px]">
          <img src="./image2.png" alt="" className="w-full h-full object-contain" />
        </div>

        <div className="flex flex-col items-center md:items-start md:w-[598px] gap-8">
          <h3 className="flex justify-center items-center w-full max-w-[476px] h-[55px] bg-[#212c42] rounded-[21px] text-white text-[24px] md:text-[34px] font-normal font-Jost text-center md:text-center">
            Um pouco sobre CO-OP
          </h3>
          <p className="text-[#212c42] text-[18px] md:text-[23px] font-normal font-Jost leading-relaxed md:leading-relaxed text-center md:text-left">
            Bem-vindo ao CO-OP, uma plataforma especializada criada para facilitar a troca de serviços, recursos e parcerias dentro da comunidade de desenvolvimento de software. Nossa missão é tornar a busca por materiais, serviços e colaboradores o mais prática, rápida e intuitiva possível, aprimorando a experiência de desenvolvimento para os criadores.
          </p>

          {/* Mobile image */}
          <div className="block md:hidden w-[300px] h-[300px]">
            <img src="./image2.png" alt="" className="w-full h-full object-contain" />
          </div>

          <p className="text-[#212c42] text-[18px] md:text-[22px] font-normal font-Jost leading-relaxed md:leading-relaxed text-center md:text-left">
            O CO-OP oferece uma variedade de recursos adaptados às suas necessidades. Encontre espaços comunitários para se conectar com outros desenvolvedores, um mercado para compra e venda de direitos sobre imagens, gráficos e texturas, e uma área dedicada para colaboração e ofertas de serviços. Seja você um desenvolvedor em busca de assistência com design, arquitetura, testes ou correções técnicas, o CO-OP reúne todos esses recursos em uma plataforma fácil de usar.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Land
