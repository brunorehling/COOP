import { useState } from "react"
import CardTech from "./CardTech"

const tecnologias = [
  "html", "css", "js", "ts",
  "jest", "java", "cobol", "express",
  "postgres", "mysql", "mongo", "laravel",
  "python", "django", "next", "react"
]

export default function TechSelector() {
  const [busca, setBusca] = useState("")
  const [selecionadas, setSelecionadas] = useState<string[]>([])

  const filtradas = tecnologias
    .filter(tec => tec.toLowerCase().includes(busca.toLowerCase()))
    .slice(0, 12)

  function toggleSelecao(tec: string) {
    setSelecionadas(prev =>
      prev.includes(tec)
        ? prev.filter(t => t !== tec)
        : [...prev, tec]
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 text-white">
      <div className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Pesquisar tecnologia"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full p-3 rounded-full bg-white text-black text-center outline-none"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-md">
        {filtradas.map(tec => (
          <CardTech
            key={tec}
            name={tec}
            selected={selecionadas.includes(tec)}
            onClick={() => toggleSelecao(tec)}
          />
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button className="bg-black text-white px-6 py-2 rounded-full hover:opacity-80 transition">
          Descartar Projeto
        </button>
        <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:opacity-80 transition">
          Publicar Projeto
        </button>
      </div>
    </div>
  )
}
