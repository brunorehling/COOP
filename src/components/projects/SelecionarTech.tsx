import { useState, useEffect } from "react"
import CardTech from "./CardTech"
import { tecnologias } from "./ListaTech"

interface TechSelectorProps {
  onChange?: (techs: string[]) => void
  defaultValues?: string[] 
}

export default function TechSelector({ onChange, defaultValues = [] }: TechSelectorProps) {
  const [busca, setBusca] = useState("")
  const [selecionadas, setSelecionadas] = useState<string[]>(defaultValues)

  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      setSelecionadas(defaultValues)
    }
  }, [defaultValues.join(",")]) 

  // Notifica o pai
  useEffect(() => {
    onChange?.(selecionadas)
  }, [selecionadas])

  const filtradas = tecnologias
    .filter(([_, nome]) => nome.toLowerCase().includes(busca.toLowerCase()))
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
          className="w-full p-3 rounded-full bg-[#2D3D5B] text-white text-center border border-gray-600 focus:border-[#E64EEB] focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap justify-center items-center gap-3 max-w-md min-w-md">
        {filtradas.map(([src, nome]) => (
          <CardTech
            key={nome}
            name={nome}
            img={src}
            selected={selecionadas.includes(nome)}
            onClick={() => toggleSelecao(nome)}
          />
        ))}
      </div>
    </div>
  )
}

