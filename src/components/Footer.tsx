export function Footer () {
    return (
        <>
            <footer className=" w-auto h-auto flex justify-around items-center gap-14 pr-14 pl-14 pt-20 pb-24 md:pr-24 md:pl-28 md:pt-10 md:pb-20">
                <img src="./Footer.webp" alt="Footer" className= "md:block" />
                <div className="flex flex-col items-center">
                    <p className="text-white text-[42px] md:text-[46px] font-semibold font-Jost">CO-OP</p>
                    <p className="text-white text-2xl font-extralight font-Jost">©co-op / direitos reservados</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;
