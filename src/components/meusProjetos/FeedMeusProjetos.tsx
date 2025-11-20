import { Cabecalho2 } from "../Cabecalho2"
import { MapProjectsUser } from "./MapeadorProjetosUser"
import { Navegacao } from "../Navegacao"

function FeedUser() {
    return (
        <>
            <main className="">
                <Cabecalho2 />
                <Navegacao />
                <div className="flex flex-col justify-center items-center pt-14 pb-8">
                    <MapProjectsUser />        
                </div>
            </main>

        </>
    )
}

export default FeedUser