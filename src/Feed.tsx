import { Cabecalho1 } from "./components/Cabecalho1"
import { Cabecalho2 } from "./components/Cabecalho2"
import { MapProjects } from "./components/MapeadorProjetos"
import { Navegacao } from "./components/Navegacao"

function Feed() {
  const token = localStorage.getItem("token")
  const isLogged = !!token

  return (
    <main >
      {isLogged ? <Cabecalho2 /> : <Cabecalho1 />}
      {isLogged && <Navegacao />}
      <div className="flex flex-col justify-center items-center pt-14 pb-8">
        <MapProjects />
      </div>
    </main>
  )
}

export default Feed
