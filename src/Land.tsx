import { Link } from 'react-router-dom'
import { Cabecalho1 } from "./components/Cabecalho1.tsx"
import { Footer } from './components/Footer.tsx'

function Land() {

  return (
    <>
      <Cabecalho1 />
        <section className="bg-[#212b41] flex flex-col-reverse md:flex-row md:justify-around items-center gap-14 pr-14 pl-14 pt-7 pb-28 md:pr-28 md:pl-28 md:pt-10 md:pb-20">
          <div className="md:w-[650px] flex flex-col items-start gap-4">
            <h2 className=" text-white text-[44px] md:text-[60px] font-semibold font-Jost">COOPERE, CONHEÇA E COLABORE COM PESSOAS EM SEUS PROJETOS.</h2>
            <p className=" text-white/60 text-[22px] md:text-[24px] font-normal font-Jost">Buscamos impulsionar e criar um ecossistema  rico para desenvolvedores e idealizadores. Venha bater papo, curtir e colaborar!</p>
            <div className="flex justify-center items-center w-[648px] pt-6">
              <button className="flex justify-center items-center w-[220.26px] h-[43px] bg-[#e64eeb] rounded-[21px] text-white text-2xl font-normal font-Jost"><Link to="/feed">Let's CO-OP!</Link></button>
            </div>
          </div>
          <div className="">
            <img src="./image1.png" alt="" className="w-[551px] h-[488px] md:w-[547px] md:h-[530px]" />
          </div>
        </section>
        <section className="flex flex-col md:flex-row md:justify-around bg-white items-center gap-14 pr-14 pl-14 pt-20 pb-28 md:pr-24 md:pl-28 md:pt-10 md:pb-20">
          <div className="hidden md:block">
            <img src="./image2.png" alt="" className="" />
          </div>
          <div className="flex flex-col items-center md:w-[598px] md:h-auto md:pt-10 md:pb-10 gap-10">
            <h3 className="flex justify-center items-center w-[476px] h-[55px] bg-[#212c42] rounded-[21px] text-white text-[32px] md:text-[34px] font-normal font-Jost">Um pouco sobre CO-OP</h3>
            <p className="text-[#212c42] text-[22px] md:text-[23px] font-normal font-Jost">Bem-vindo ao CO-OP, uma plataforma especializada criada para facilitar a troca de serviços, recursos e parcerias dentro da comunidade de desenvolvimento de software. Nossa missão é tornar a busca por materiais, serviços e colaboradores o mais prática, rápida e intuitiva possível, aprimorando a experiência de desenvolvimento para os criadores.</p>
            <div className="block md:hidden w-[306px] h-[302px] md:w-[468px] md:h-[462px]">
              <img src="./image2.png" alt="" className="" />
            </div>
            <p className="text-[#212c42] text-[22px] font-normal font-Jost">O CO-OP oferece uma variedade de recursos adaptados às suas necessidades. Encontre espaços comunitários para se conectar com outros desenvolvedores, um mercado para compra e venda de direitos sobre imagens, gráficos e texturas, e uma área dedicada para colaboração e ofertas de serviços. Seja você um desenvolvedor em busca de assistência com design, arquitetura, testes ou correções técnicas, o CO-OP reúne todos esses recursos em uma plataforma fácil de usar.</p>
          </div>
        </section>
      <Footer />
    </>
  )
}

export default Land
