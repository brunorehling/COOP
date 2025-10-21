import { Cabecalho1 } from "./components/Cabecalho1"
import { Cabecalho2 } from "./components/Cabecalho2"
import CardFeedPadrao from "./components/CardFeedPadrao"
import { Navegacao } from "./components/Navegacao"

function Feed() {
    return (
        <>
            <main className="bg-[#212b41]">
                <Cabecalho1 />
                <Navegacao />
                <div className="flex flex-col justify-center items-center pt-14 pb-8">
                    <CardFeedPadrao />
                    <CardFeedPadrao />
                    <CardFeedPadrao />
                </div>
            </main>
        </>
    )
}

export default Feed