import  CardTechUser  from './CardTechUser';


export function userProfile(){
    return(
        <>
            <div className="flex flex-warp bg-white w-full h-20% items-center justify-center shadow-lg mb-10">
                <div>
                    <h1>Sobre</h1>
                    <p>Desenvolvedor front-end em crescimento, focado em React e Tailwind. Estou aqui para colaborar em projetos, aprender com outras pessoas e construir experiências digitais que façam diferença.</p>
                </div>
                <div>
                    <h1>habilidades técnicas</h1>
                    <ul className='flex flex-warp gap-2'>
                        <li><CardTechUser name="html" /></li>
                        <li><CardTechUser name="css" /></li>
                        <li><CardTechUser name="js" /></li>
                        <li><CardTechUser name="ts" /></li>
                        <li><CardTechUser name="react" /></li>
                        <li><CardTechUser name="next"  /></li>
                    </ul>
                </div>
            </div>     
        
        </>
    )
}