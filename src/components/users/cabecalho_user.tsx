
export function CabecalhoUser() {
return(
    <>
        <div className="flex flex-warp bg-[#212b41] w-full h-20% items-center justify-center shadow-lg mb-10">
            <div className="flex flex-warp jutify-center items-center">
                <img src="" alt="Foto de perfil" className="w-10% h-10% rounded-xl"/>
                <div>
                    <h1 className="underline underline-offset-8 underline-[#e64eeb]">Vitor Veiga</h1>
                    <h2 className="text-gray-500">desenvolvedor</h2>
                </div>
            </div>
            <div>
                <ul>
                    <li className="flex flex-warp gap-2">
                        <p className="font-bold text-[#e64eeb]">Email: </p>
                        <p>Vitor.Veiga@gmail.com</p>
                    </li>
                    <li className="flex flex-warp gap-2">
                        <p className="font-bold text-[#e64eeb]">Localização: </p>
                        <p>Pelotas/RS, Brasil</p>
                    </li>
                    <li className="flex flex-warp gap-2">
                        <p className="font-bold text-[#e64eeb]">Telefone: </p>
                        <p>(11) 99999-9999</p>
                    </li>
                </ul>
            </div>

        </div>    
    </>
)
}