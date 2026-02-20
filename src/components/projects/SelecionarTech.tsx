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

  // Só sincroniza defaultValues quando realmente mudar
  useEffect(() => {
    if (defaultValues && defaultValues.length > 0) {
      setSelecionadas(defaultValues)
    }
  }, [defaultValues.join(",")]) // ← evita recriar array e dar loop

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
          className="w-full p-3 rounded-full bg-white text-black text-center outline-none"
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
