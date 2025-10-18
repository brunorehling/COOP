export function InfoUserPages () {
    return (
        <>
            <div className="flex justify-center items-center gap-10 p-6 md:p-2">
                <div className="flex justify-normal items-center gap-4">
                    <div className="bg-white rounded-full w-[40px] h-[40px] md:w-[55px] md:h-[55px] flex items-center justify-center">
                        <img src="./user.png" alt="" className="w-[19px] h-[19px] md:w-[24px] md:h-[24px]" />
                    </div>
                    <div className="">
                        <p className="text-white text-[20px] md:text-[20px] font-normal font-Jost underline underline-offset-8">Fulano TamTam</p>
                        <p className="text-white text-base md:text-lg font-extralight font-Jost pt-1">Desenvolvedor</p>
                    </div>
                </div>
                <div className="w-[122px] h-6 md:w-[145px] md:h-[30px] bg-[#e64eeb] rounded-[25px] flex justify-center items-center gap-4">
                    <p className="text-white text-base md:text-lg font-normal font-Jost">Seguindo</p>
                    <img src="./confirma.png" alt="" className="" />
                </div>
                <div className="flex justify-center items-center gap-2">
                    <img src="./userBranco.png" alt="Icone Usuario" className="w-[22px] h-[22px]" /><p className="text-white text-base md:text-xl font-normal font-Jost">3</p>
                </div>
            </div>
        </>
    )   
}