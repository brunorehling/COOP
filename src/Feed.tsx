import { Cabecalho2 } from "./components/Cabecalho2"
import CardFeedExemplo from "./components/cardFeedExemplo"
import { Navegacao } from "./components/Navegacao"

function Feed() {
    return (
        <>
            <main className="bg-[#212b41]">
                <Cabecalho2 />
                <Navegacao />
                <div className="flex flex-col justify-center items-center pt-14 pb-8">
                    <CardFeedExemplo />
                    <CardFeedExemplo />
                    <CardFeedExemplo />
                    <CardFeedExemplo />        
                </div>
            </main>

        </>
    )
}

export default Feed